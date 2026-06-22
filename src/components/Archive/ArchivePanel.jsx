import { getFieldNoteById } from '../../data/fieldNotes'
import './Archive.css'

export default function ArchivePanel({ workshop, onClose }) {
  if (!workshop) return null

  const relatedNotes = workshop.relatedFieldNotes
    .map((id) => getFieldNoteById(id))
    .filter(Boolean)

  return (
    <>
      <button type="button" className="archive-panel__backdrop" aria-label="Close" onClick={onClose} />
      <aside className="archive-panel" aria-labelledby="archive-panel-title">
        <div className="archive-panel__header">
          <button type="button" className="archive-panel__close text-link" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="archive-panel__body">
          <p className="archive-panel__date">{workshop.date}</p>
          <h2 id="archive-panel-title" className="archive-panel__title">
            {workshop.title}
          </h2>
          <p className="archive-panel__location">{workshop.location}</p>

          <div className="archive-panel__section">
            <h3 className="archive-panel__label">Participants</h3>
            <ul className="archive-panel__list">
              {workshop.participants.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <div className="archive-panel__section">
            <h3 className="archive-panel__label">Description</h3>
            <p className="archive-panel__text">{workshop.description}</p>
          </div>

          <div className="archive-panel__section">
            <h3 className="archive-panel__label">Images</h3>
            {workshop.images.length > 0 ? (
              <ul className="archive-panel__list">
                {workshop.images.map((image) => (
                  <li key={image}>{image}</li>
                ))}
              </ul>
            ) : (
              <p className="archive-panel__text archive-panel__text--quiet">No images indexed yet.</p>
            )}
          </div>

          <div className="archive-panel__section">
            <h3 className="archive-panel__label">Related field notes</h3>
            {relatedNotes.length > 0 ? (
              <ul className="archive-panel__list archive-panel__list--linked">
                {relatedNotes.map((note) => (
                  <li key={note.id}>
                    <a className="text-link" href={`#field-notes`}>
                      {note.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="archive-panel__text archive-panel__text--quiet">None linked.</p>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
