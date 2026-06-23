import { useState } from 'react'
import Navigation from '../components/Navigation/Navigation'
import Hero from '../components/Hero/Hero'
import Archive from '../components/Archive/Archive'
import JoinUs from '../components/JoinUs/JoinUs'
import JoinUsPopup from '../components/JoinUs/JoinUsPopup'
import Protocols from '../components/Protocols/Protocols'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(null)
  const [highlightedItemId, setHighlightedItemId] = useState(null)
  const [showJoinPopup, setShowJoinPopup] = useState(false)

  function goHome() {
    setActiveSection(null)
    setShowJoinPopup(false)
    window.scrollTo({ top: 0 })
  }

  function goTo(section) {
    setActiveSection(section)
    window.scrollTo({ top: 0 })
  }

  function goToArchiveItem(itemId) {
    setHighlightedItemId(itemId)
    setActiveSection('archive')
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <Navigation activeSection={activeSection} onNavigate={goTo} onHome={goHome} />
      <main className="site">
        {activeSection === null && (
          <Hero
            onJoinUs={() => { goTo('join-us'); setShowJoinPopup(true) }}
            onGoToArchiveItem={goToArchiveItem}
          />
        )}
        {activeSection === 'archive' && (
          <Archive highlightedItemId={highlightedItemId} />
        )}
        {activeSection === 'join-us' && <JoinUs />}
        {activeSection === 'protocols' && <Protocols />}
        {activeSection === 'contact' && <Contact />}
      </main>
      {activeSection !== null && <Footer />}
      {activeSection === 'join-us' && showJoinPopup && (
        <JoinUsPopup onClose={() => setShowJoinPopup(false)} />
      )}
    </>
  )
}
