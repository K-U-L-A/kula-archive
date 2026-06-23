import { useRef } from 'react'
import WordmarkHero from './WordmarkHero'
import useWordmarkTouchZoom from './useWordmarkTouchZoom'
import './Hero.css'

export default function Hero({ onGoToArchiveItem, onJoinUs }) {
  const zoomBodyRef = useRef(null)
  useWordmarkTouchZoom(zoomBodyRef)

  return (
    <section className="hero section-anchor" aria-label="KULA">
      <div className="hero__content">
        <div className="hero__zoom">
          <div ref={zoomBodyRef} className="hero__zoom-body">
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
