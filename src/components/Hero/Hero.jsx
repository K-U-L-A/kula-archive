import { useRef } from 'react'
import WordmarkHero from './WordmarkHero'
import useWordmarkTouchZoom from './useWordmarkTouchZoom'
import './Hero.css'

export default function Hero({ onGoToArchiveItem, onJoinUs }) {
  const zoomRef = useRef(null)
  const { zoom, easeRelease } = useWordmarkTouchZoom(zoomRef)

  return (
    <section className="hero section-anchor" aria-label="KULA">
      <div className="hero__content">
        <div
          ref={zoomRef}
          className="hero__zoom"
          style={{
            transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
            transformOrigin: 'center center',
            transition: easeRelease ? 'transform 0.15s ease-out' : 'none',
          }}
        >
          <div className="hero__zoom-body">
            <WordmarkHero onGoToArchiveItem={onGoToArchiveItem} />
          </div>
          <button
            type="button"
            className="hero__join-btn"
            onClick={onJoinUs}
          >
            JOIN US
          </button>
        </div>
      </div>
    </section>
  )
}
