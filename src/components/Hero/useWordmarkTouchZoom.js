import { useEffect, useRef } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'
const MIN_PINCH_SCALE = 1
const MAX_PINCH_SCALE = 28
const DOUBLE_TAP_MS = 300
const SCALE_SNAP = 0.5
const VIEWPORT_DEFAULT = 'width=device-width, initial-scale=1.0'
const VIEWPORT_MOBILE_HERO =
  'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'

function isMobileViewport() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function touchDistance(touches) {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  )
}

function snapPinchScale(value) {
  return Math.round(value / SCALE_SNAP) * SCALE_SNAP
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function useWordmarkTouchZoom({
  stageRef,
  wordmarkRef,
  getBaseScale,
  layoutScale,
}) {
  const viewRef = useRef({ scale: 1, x: 0, y: 0 })

  useEffect(() => {
    const stageEl = stageRef.current
    const wordmarkEl = wordmarkRef.current
    if (!stageEl || !wordmarkEl || !isMobileViewport()) return undefined

    let rafId = 0
    let pendingView = null

    const gesture = {
      mode: 'idle',
      initialDistance: 0,
      startScale: 1,
      panAnchorX: 0,
      panAnchorY: 0,
      panOriginX: 0,
      panOriginY: 0,
      lastTapTime: 0,
    }

    const viewportMeta = document.querySelector('meta[name="viewport"]')

    function visualSize(pinchScale) {
      const base = getBaseScale()
      const logicalWidth = wordmarkEl.offsetWidth
      const logicalHeight = wordmarkEl.offsetHeight

      return {
        width: logicalWidth * base * pinchScale,
        height: logicalHeight * base * pinchScale,
        totalScale: base * pinchScale,
      }
    }

    function clampPan(x, y, pinchScale) {
      if (pinchScale <= 1) {
        return { x: 0, y: 0 }
      }

      const parent = stageEl.parentElement
      if (!parent) {
        return { x: 0, y: 0 }
      }

      const { width, height } = visualSize(pinchScale)
      const viewportWidth = parent.clientWidth
      const viewportHeight = parent.clientHeight
      const maxX = Math.max(0, (width - viewportWidth) / 2)
      const maxY = Math.max(0, (height - viewportHeight) / 2)

      return {
        x: clamp(Math.round(x), -maxX, maxX),
        y: clamp(Math.round(y), -maxY, maxY),
      }
    }

    function applyView(view, animate) {
      const rawScale = clamp(view.scale, MIN_PINCH_SCALE, MAX_PINCH_SCALE)
      const pinchScale = animate ? snapPinchScale(rawScale) : rawScale
      const pan = clampPan(view.x, view.y, pinchScale)
      const nextView = { scale: pinchScale, ...pan }
      viewRef.current = nextView

      const { totalScale } = visualSize(pinchScale)
      wordmarkEl.style.transformOrigin = 'top left'
      wordmarkEl.style.transition = animate ? 'transform 0.15s ease-out' : 'none'
      wordmarkEl.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${totalScale})`
      stageEl.classList.toggle('is-gesturing', !animate && gesture.mode !== 'idle')
    }

    function scheduleApply(view, animate) {
      pendingView = { view, animate }
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        if (!pendingView) return
        const next = pendingView
        pendingView = null
        applyView(next.view, next.animate)
      })
    }

    function onTouchStart(event) {
      if (event.touches.length === 2) {
        event.preventDefault()
        gesture.mode = 'pinch'
        gesture.initialDistance = touchDistance(event.touches)
        gesture.startScale = viewRef.current.scale
        return
      }

      if (event.touches.length !== 1) {
        return
      }

      const now = Date.now()
      if (now - gesture.lastTapTime < DOUBLE_TAP_MS) {
        event.preventDefault()
        applyView({ scale: 1, x: 0, y: 0 }, true)
        gesture.lastTapTime = 0
        gesture.mode = 'idle'
        return
      }

      gesture.lastTapTime = now

      if (viewRef.current.scale > 1) {
        gesture.mode = 'pan'
        gesture.panAnchorX = event.touches[0].clientX
        gesture.panAnchorY = event.touches[0].clientY
        gesture.panOriginX = viewRef.current.x
        gesture.panOriginY = viewRef.current.y
      }
    }

    function onTouchMove(event) {
      if (gesture.mode === 'pinch' && event.touches.length === 2) {
        event.preventDefault()
        if (gesture.initialDistance <= 0) return

        const rawScale =
          (touchDistance(event.touches) / gesture.initialDistance) *
          gesture.startScale
        const nextScale = clamp(rawScale, MIN_PINCH_SCALE, MAX_PINCH_SCALE)
        scheduleApply(
          { scale: nextScale, x: viewRef.current.x, y: viewRef.current.y },
          false,
        )
        return
      }

      if (gesture.mode === 'pan' && event.touches.length === 1) {
        event.preventDefault()
        const dx = event.touches[0].clientX - gesture.panAnchorX
        const dy = event.touches[0].clientY - gesture.panAnchorY
        scheduleApply(
          {
            scale: viewRef.current.scale,
            x: gesture.panOriginX + dx,
            y: gesture.panOriginY + dy,
          },
          false,
        )
      }
    }

    function onTouchEnd(event) {
      if (event.touches.length === 0) {
        if (gesture.mode === 'pinch' || gesture.mode === 'pan') {
          applyView(viewRef.current, true)
        }
        gesture.mode = 'idle'
        gesture.initialDistance = 0
        stageEl.classList.remove('is-gesturing')
        return
      }

      if (event.touches.length === 1 && gesture.mode === 'pinch') {
        gesture.mode = 'idle'
        gesture.initialDistance = 0
        applyView(viewRef.current, true)
        stageEl.classList.remove('is-gesturing')
      }
    }

    function blockBrowserZoom(event) {
      if (event.touches.length >= 2) {
        event.preventDefault()
      }
    }

    function blockGesture(event) {
      event.preventDefault()
    }

    function onViewportChange() {
      applyView(viewRef.current, false)
    }

    if (viewportMeta) {
      viewportMeta.setAttribute('content', VIEWPORT_MOBILE_HERO)
    }

    applyView({ scale: 1, x: 0, y: 0 }, false)

    stageEl.addEventListener('touchstart', onTouchStart, { passive: false })
    stageEl.addEventListener('touchmove', onTouchMove, { passive: false })
    stageEl.addEventListener('touchend', onTouchEnd, { passive: false })
    stageEl.addEventListener('touchcancel', onTouchEnd, { passive: false })
    document.addEventListener('touchmove', blockBrowserZoom, { passive: false })
    document.addEventListener('gesturestart', blockGesture)
    document.addEventListener('gesturechange', blockGesture)
    document.addEventListener('gestureend', blockGesture)
    window.addEventListener('resize', onViewportChange)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      stageEl.removeEventListener('touchstart', onTouchStart)
      stageEl.removeEventListener('touchmove', onTouchMove)
      stageEl.removeEventListener('touchend', onTouchEnd)
      stageEl.removeEventListener('touchcancel', onTouchEnd)
      document.removeEventListener('touchmove', blockBrowserZoom)
      document.removeEventListener('gesturestart', blockGesture)
      document.removeEventListener('gesturechange', blockGesture)
      document.removeEventListener('gestureend', blockGesture)
      window.removeEventListener('resize', onViewportChange)
      wordmarkEl.style.transform = ''
      wordmarkEl.style.transition = ''
      stageEl.classList.remove('is-gesturing')
      if (viewportMeta) {
        viewportMeta.setAttribute('content', VIEWPORT_DEFAULT)
      }
    }
  }, [stageRef, wordmarkRef, getBaseScale, layoutScale])

  return viewRef
}
