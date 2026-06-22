import { getFieldNotes } from '../../data/fieldNotes'
import './FieldNotes.css'

export default function FieldNotes() {
  const notes = getFieldNotes()

  return (
    <section id="field-notes" className="field-notes section-anchor">
      <div className="field-notes__intro">
        <h2 className="section-label">Field Notes</h2>
        <p className="field-notes__desc">
          Fragments, references, and unfinished ideas collected along the way...{' '}
          <span className="pixel-popup__glyph">□</span>
        </p>
      </div>
    </section>
  )
}
