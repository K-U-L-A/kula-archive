import ArchiveItem from './ArchiveItem'
import './Archive.css'

export default function ArchiveGrid({ workshops, onSelect }) {
  return (
    <div className="archive-grid" role="list">
      {workshops.map((workshop) => (
        <ArchiveItem key={workshop.id} workshop={workshop} onSelect={onSelect} />
      ))}
    </div>
  )
}
