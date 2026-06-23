import WordmarkHero from './WordmarkHero'
import './Hero.css'

export default function Hero({ onGoToArchiveItem, onJoinUs }) {
  return (
    <section className="hero section-anchor" aria-label="KULA">
      <WordmarkHero onGoToArchiveItem={onGoToArchiveItem} />
      <button
        type="button"
        className="hero__join-btn"
        onClick={onJoinUs}
      >
        JOIN US
      </button>
    </section>
  )
}
