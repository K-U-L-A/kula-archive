import { useEffect, useRef, useState } from 'react'
import WordmarkHero from './WordmarkHero'
import './Hero.css'

const MIN_PINCH_SCALE = 1
const MAX_PINCH_SCALE = 4
const DOUBLE_TAP_MS = 300

export default function Hero({ onGoToArchiveItem, onJoinUs }) {
  const wrapperRef = useRef(null)
  const [pinchScale, setPinchScale] = useState(1)
  const pinchScaleRef = useRef(1)

  pinchScaleRef.current = pinchScale

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return undefined

    const gesture = {
      initialDistance: 0,
      startScale: 1,
      lastTapTime: 0,
    }

    function touchDistance(touches) {
      return Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY,
      )
    }

    function onTouchStart(event) {
      if (event.touches.length === 2) {
        event.preventDefault()
        gesture.initialDistance = touchDistance(event.touches)
        gesture.startScale = pinchScaleRef.current
        return
      }

      if (event.touches.length === 1) {
        const now = Date.now()
        if (now - gesture.lastTapTime < DOUBLE_TAP_MS) {
          setPinchScale(1)
          gesture.lastTapTime = 0
        } else {
          gesture.lastTapTime = now
        }
      }
    }

    function onTouchMove(event) {
      if (event.touches.length !== 2) return

      event.preventDefault()

      if (gesture.initialDistance <= 0) return

      const nextScale =
        (touchDistance(event.touches) / gesture.initialDistance) *
        gesture.startScale

      setPinchScale(
        Math.min(MAX_PINCH_SCALE, Math.max(MIN_PINCH_SCALE, nextScale)),
      )
    }

    function onTouchEnd(event) {
      if (event.touches.length < 2) {
        gesture.initialDistance = 0
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: false })
    el.addEventListener('touchcancel', onTouchEnd, { passive: false })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  return (
    <section className="hero section-anchor" aria-label="KULA">
      <div
        ref={wrapperRef}
        className="hero__content"
        style={{
          transform: `scale(${pinchScale})`,
          transformOrigin: 'center center',
        }}
      >
        <WordmarkHero onGoToArchiveItem={onGoToArchiveItem} />
        <button
          type="button"
          className="hero__join-btn"
          onClick={onJoinUs}
        >
          JOIN US
        </button>
      </div>
    </section>
  )
}
