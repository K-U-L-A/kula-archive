import { useEffect, useRef, useState } from 'react'
import './JoinUsPopup.css'

export default function JoinUsPopup({ onClose }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 120, y: 120 })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragging.current) return
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      })
    }
    function onMouseUp() {
      dragging.current = false
    }
    function onTouchMove(e) {
      if (!dragging.current) return
      e.preventDefault()
      const touch = e.touches[0]
      if (!touch) return
      setPos({
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      })
    }
    function onTouchEnd() {
      dragging.current = false
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  function onMouseDown(e) {
    if (e.target.closest('button')) return
    dragging.current = true
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
  }

  function onTouchStart(e) {
    if (e.target.closest('button')) return
    const touch = e.touches[0]
    if (!touch) return
    dragging.current = true
    offset.current = {
      x: touch.clientX - pos.x,
      y: touch.clientY - pos.y,
    }
  }

  return (
    <div
      ref={ref}
      className="joinus-chip"
      style={{ left: pos.x, top: pos.y }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <button type="button" className="joinus-chip__close" onClick={onClose}>×</button>
      <p className="joinus-chip__title">Channels</p>
      <p className="joinus-chip__body">*** See you on Discord! ***</p>
      <p className="joinus-chip__note">··· stay close ⌂</p>
    </div>
  )
}
