import { useState } from 'react'
import Navigation from '../components/Navigation/Navigation'
import Hero from '../components/Hero/Hero'
import Archive from '../components/Archive/Archive'
import Gatherings from '../components/Gatherings/Gatherings'
import FieldNotes from '../components/FieldNotes/FieldNotes'
import Protocols from '../components/Protocols/Protocols'
import JoinUs from '../components/JoinUs/JoinUs'
import Hosting from '../components/Hosting/Hosting'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(null)

  function goHome() {
    setActiveSection(null)
    window.scrollTo({ top: 0 })
  }

  function goTo(section) {
    setActiveSection(section)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <Navigation activeSection={activeSection} onNavigate={goTo} onHome={goHome} />
      <main className="site">
        {activeSection === null && <Hero />}
        {activeSection === 'archive' && <Archive />}
        {activeSection === 'gatherings' && <Gatherings />}
        {activeSection === 'field-notes' && <FieldNotes />}
        {activeSection === 'protocols' && <Protocols />}
        {activeSection === 'join-us' && <JoinUs />}
        {activeSection === 'hosting' && <Hosting />}
        {activeSection === 'contact' && <Contact />}
      </main>
      {activeSection !== null && <Footer />}
    </>
  )
}
