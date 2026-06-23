import { useEffect, useRef } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'
const MIN_PINCH_SCALE = 1
const MAX_PINCH_SCALE = 28
const DOUBLE_TAP_MS = 300
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

export default function useWordmarkTouchZoom(containerRef) {
  const viewRef = useRef({ scale: 1, x: 0, y: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el || !isMobileViewport()) return undefined

    const baseSizeRef = { width: 0, height: 0 }
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

    function measureBaseSize() {
      el.style.transform = 'none'
      baseSizeRef.width = el.offsetWidth
      baseSizeRef.height = el.offsetHeight
      applyView(viewRef.current, false)
    }

    function clampPan(x, y, scale) {
      if (scale <= 1) {
        return { x: 0, y: 0 }
      }

      const { width, height } = baseSizeRef
      const parent = el.parentElement
      if (!parent || width === 0 || height === 0) {
        return { x: 0, y: 0 }
      }

      const viewportWidth = parent.clientWidth
      const viewportHeight = parent.clientHeight
      const scaledWidth = width * scale
      const scaledHeight = height * scale
      const maxX = Math.max(0, (scaledWidth - viewportWidth) / 2)
      const maxY = Math.max(0, (scaledHeight - viewportHeight) / 2)

      return {
        x: Math.min(maxX, Math.max(-maxX, x)),
        y: Math.min(maxY, Math.max(-maxY, y)),
      }
    }

    function applyView(view, animate) {
      viewRef.current = view
      el.style.transformOrigin = 'center center'
      el.style.transition = animate ? 'transform 0.15s ease-out' : 'none'
      el.style.transform = `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`
      el.classList.toggle('is-gesturing', !animate && gesture.mode !== 'idle')
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
        el.style.willChange = 'transform'
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
        el.style.willChange = 'auto'
        return
      }

      gesture.lastTapTime = now

      if (viewRef.current.scale > 1) {
        gesture.mode = 'pan'
        gesture.panAnchorX = event.touches[0].clientX
        gesture.panAnchorY = event.touches[0].clientY
        gesture.panOriginX = viewRef.current.x
        gesture.panOriginY = viewRef.current.y
        el.style.willChange = 'transform'
      }
    }

    function onTouchMove(event) {
      if (gesture.mode === 'pinch' && event.touches.length === 2) {
        event.preventDefault()

        if (gesture.initialDistance <= 0) return

        const nextScale = Math.min(
          MAX_PINCH_SCALE,
          Math.max(
            MIN_PINCH_SCALE,
            (touchDistance(event.touches) / gesture.initialDistance) *
              gesture.startScale,
          ),
        )
        const pan = clampPan(viewRef.current.x, viewRef.current.y, nextScale)
        scheduleApply({ scale: nextScale, ...pan }, false)
        return
      }

      if (gesture.mode === 'pan' && event.touches.length === 1) {
        event.preventDefault()
        const dx = event.touches[0].clientX - gesture.panAnchorX
        const dy = event.touches[0].clientY - gesture.panAnchorY
        const pan = clampPan(
          gesture.panOriginX + dx,
          gesture.panOriginY + dy,
          viewRef.current.scale,
        )
        scheduleApply({ scale: viewRef.current.scale, ...pan }, false)
      }
    }

    function onTouchEnd(event) {
      if (event.touches.length === 0) {
        if (gesture.mode === 'pinch' || gesture.mode === 'pan') {
          const pan = clampPan(
            viewRef.current.x,
            viewRef.current.y,
            viewRef.current.scale,
          )
          applyView({ scale: viewRef.current.scale, ...pan }, true)
        }
        gesture.mode = 'idle'
        gesture.initialDistance = 0
        el.style.willChange = 'auto'
        el.classList.remove('is-gesturing')
        return
      }

      if (event.touches.length === 1 && gesture.mode === 'pinch') {
        gesture.mode = 'idle'
        gesture.initialDistance = 0
        applyView(viewRef.current, true)
        el.style.willChange = 'auto'
        el.classList.remove('is-gesturing')
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

    if (viewportMeta) {
      viewportMeta.setAttribute('content', VIEWPORT_MOBILE_HERO)
    }

    measureBaseSize()
    const resizeObserver = new ResizeObserver(measureBaseSize)
    resizeObserver.observe(el)

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: false })
    el.addEventListener('touchcancel', onTouchEnd, { passive: false })
    document.addEventListener('touchmove', blockBrowserZoom, { passive: false })
    document.addEventListener('gesturestart', blockGesture)
    document.addEventListener('gesturechange', blockGesture)
    document.addEventListener('gestureend', blockGesture)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      resizeObserver.disconnect()
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      document.removeEventListener('touchmove', blockBrowserZoom)
      document.removeEventListener('gesturestart', blockGesture)
      document.removeEventListener('gesturechange', blockGesture)
      document.removeEventListener('gestureend', blockGesture)
      el.style.transform = ''
      el.style.transition = ''
      el.style.willChange = ''
      el.classList.remove('is-gesturing')
      if (viewportMeta) {
        viewportMeta.setAttribute('content', VIEWPORT_DEFAULT)
      }
    }
  }, [containerRef])

  return null
}
