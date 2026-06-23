import { useEffect, useState } from 'react'
import { getArchiveWorkshops, getWorkshopById } from '../../data/archive'
import ArchiveGrid from '../Archive/ArchiveGrid'
import ArchivePanel from '../Archive/ArchivePanel'
import '../Archive/Archive.css'

export default function Gatherings() {
  const workshops = getArchiveWorkshops()
  const [selectedId, setSelectedId] = useState(null)
  const selectedWorkshop = selectedId ? getWorkshopById(selectedId) : null

  const upcomingWorkshops = workshops.filter((w) => w.gathering === 'upcoming')
  const pastWorkshops = workshops.filter((w) => w.gathering === 'past')

  useEffect(() => {
    if (!selectedId) return undefined
    function onKeyDown(e) {
      if (e.key === 'Escape') setSelectedId(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedId])

  return (
    <section id="gatherings" className="archive section-anchor">
      <div className="archive__intro">
        <h2 className="section-label">Gatherings | Programs</h2>
      </div>

      <div id="upcoming" className="archive__gathering section-anchor">
        <h3 className="archive__gathering-label">Upcoming</h3>
        {upcomingWorkshops.length === 0 ? (
          <p className="archive__empty">
            ··· soon!
          </p>
        ) : (
          <ArchiveGrid workshops={upcomingWorkshops} onSelect={setSelectedId} />
        )}
      </div>

      <div id="past" className="archive__gathering section-anchor">
        <h3 className="archive__gathering-label">Past</h3>
        {pastWorkshops.length === 0 ? (
          <p className="archive__empty">
            nothing yet···
          </p>
        ) : (
          <ArchiveGrid workshops={pastWorkshops} onSelect={setSelectedId} />
        )}
      </div>

      <ArchivePanel workshop={selectedWorkshop} onClose={() => setSelectedId(null)} />
    </section>
  )
}
