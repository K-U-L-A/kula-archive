import './Archive.css'

export default function ArchiveItem({ workshop, onSelect }) {
  const { title, date, location, layout } = workshop

  return (
    <button
      type="button"
      className="archive-item"
      role="listitem"
      style={{
        '--archive-align': layout.align,
        '--archive-offset': layout.offset,
        '--archive-span': layout.span,
      }}
      onClick={() => onSelect(workshop.id)}
    >
      <span className="archive-item__index">{date}</span>
      <span className="archive-item__title">{title}</span>
      <span className="archive-item__meta">{location}</span>
    </button>
  )
}
