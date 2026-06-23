import { useEffect, useRef, useState } from 'react'

const MIN_PINCH_SCALE = 1
const MAX_PINCH_SCALE = 4
const DOUBLE_TAP_MS = 300

export default function useWordmarkTouchZoom(containerRef) {
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 })
  const [easeRelease, setEaseRelease] = useState(false)
  const zoomRef = useRef(zoom)
  const baseSizeRef = useRef({ width: 0, height: 0 })

  zoomRef.current = zoom

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

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

    function measureBaseSize() {
      baseSizeRef.current = {
        width: el.offsetWidth,
        height: el.offsetHeight,
      }
    }

    measureBaseSize()
    const resizeObserver = new ResizeObserver(measureBaseSize)
    resizeObserver.observe(el)

    function touchDistance(touches) {
      return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      )
    }

    function clampPan(x, y, scale) {
      if (scale <= 1) {
        return { x: 0, y: 0 }
      }

      const { width, height } = baseSizeRef.current
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

    function commitView(next, animate) {
      setEaseRelease(animate)
      setZoom(next)
    }

    function onTouchStart(event) {
      setEaseRelease(false)

      if (event.touches.length === 2) {
        event.preventDefault()
        gesture.mode = 'pinch'
        gesture.initialDistance = touchDistance(event.touches)
        gesture.startScale = zoomRef.current.scale
        return
      }

      if (event.touches.length !== 1) {
        return
      }

      const now = Date.now()
      if (now - gesture.lastTapTime < DOUBLE_TAP_MS) {
        event.preventDefault()
        commitView({ scale: 1, x: 0, y: 0 }, true)
        gesture.lastTapTime = 0
        gesture.mode = 'idle'
        return
      }

      gesture.lastTapTime = now

      if (zoomRef.current.scale > 1) {
        gesture.mode = 'pan'
        gesture.panAnchorX = event.touches[0].clientX
        gesture.panAnchorY = event.touches[0].clientY
        gesture.panOriginX = zoomRef.current.x
        gesture.panOriginY = zoomRef.current.y
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
        const pan = clampPan(zoomRef.current.x, zoomRef.current.y, nextScale)
        commitView({ scale: nextScale, ...pan }, false)
        return
      }

      if (gesture.mode === 'pan' && event.touches.length === 1) {
        event.preventDefault()
        const dx = event.touches[0].clientX - gesture.panAnchorX
        const dy = event.touches[0].clientY - gesture.panAnchorY
        const pan = clampPan(
          gesture.panOriginX + dx,
          gesture.panOriginY + dy,
          zoomRef.current.scale,
        )
        commitView({ scale: zoomRef.current.scale, ...pan }, false)
      }
    }

    function onTouchEnd(event) {
      if (event.touches.length === 0) {
        if (gesture.mode === 'pinch' || gesture.mode === 'pan') {
          const pan = clampPan(
            zoomRef.current.x,
            zoomRef.current.y,
            zoomRef.current.scale,
          )
          commitView({ scale: zoomRef.current.scale, ...pan }, true)
        }
        gesture.mode = 'idle'
        gesture.initialDistance = 0
        return
      }

      if (event.touches.length === 1 && gesture.mode === 'pinch') {
        gesture.mode = 'idle'
        gesture.initialDistance = 0
        commitView(zoomRef.current, true)
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: false })
    el.addEventListener('touchcancel', onTouchEnd, { passive: false })

    return () => {
      resizeObserver.disconnect()
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [containerRef])

  return { zoom, easeRelease }
}
