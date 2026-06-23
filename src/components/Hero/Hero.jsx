import WordmarkHero from './WordmarkHero'
import './Hero.css'

export default function Hero({ onGoToArchiveItem, onJoinUs }) {
  return (
    <section className="hero section-anchor" aria-label="KULA">
      <div className="hero__content">
        <div className="hero__zoom">
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
