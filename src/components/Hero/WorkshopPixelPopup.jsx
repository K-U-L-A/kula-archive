import { useEffect, useRef, useState } from 'react'
import './WorkshopPixelPopup.css'

const POPUP_W = 210
const POPUP_H = 280

export default function WorkshopPixelPopup({ workshop, position, onClose }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const x = Math.max(
    POPUP_W / 2 + 16,
    Math.min(window.innerWidth - POPUP_W / 2 - 16, position.x)
  )
  const y = Math.max(
    POPUP_H / 2 + 16,
    Math.min(window.innerHeight - POPUP_H / 2 - 16, position.y)
  )

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    function onMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [onClose])

  return (
    <div
      ref={ref}
      className={`pixel-popup${isVisible ? ' pixel-popup--visible' : ''}`}
      style={{ left: x, top: y }}
      role="dialog"
    >
      <button
        className="pixel-popup__close"
        onClick={onClose}
        type="button"
        aria-label="Close"
      >
        ×
      </button>

      <div className="pixel-popup__img-col">
        {workshop?.thumbnail ? (
          <img src={workshop.thumbnail} alt="" />
        ) : (
          <div className="pixel-popup__img-placeholder" />
        )}
      </div>

      <div className="pixel-popup__text-col">
        {workshop ? (
          <>
            <p className="pixel-popup__title">{workshop.title}</p>
            <p className="pixel-popup__detail">
              {workshop.location} · {workshop.date}
            </p>
          </>
        ) : (
          <>
            <p className="pixel-popup__empty-text">
              Nothing has happened here yet.
            </p>
            <p className="pixel-popup__empty-text">
              Maybe you'll be part of it... <span className="pixel-popup__glyph">◌𓈒𖡼</span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
