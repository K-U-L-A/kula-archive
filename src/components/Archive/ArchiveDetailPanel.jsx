import { useEffect, useRef } from 'react'
import './ArchiveDetailPanel.css'

export default function ArchiveDetailPanel({ item, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  if (!item) return null

  return (
    <div className="archive-panel__overlay" onClick={onClose}>
      <div
        className="archive-panel"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="archive-panel__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="archive-panel__media">
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title ?? ''} />
          ) : (
            <div className="archive-panel__media-empty" />
          )}
        </div>

        <div className="archive-panel__meta">
          <h2 className="archive-panel__title">
            {item.title ?? item.url}
          </h2>

          <div className="archive-panel__fields">
            <div className="archive-panel__field">
              <span className="archive-panel__field-label">Type</span>
              <span className="archive-panel__field-value">
                {item.type}{item.collection ? ` — ${item.collection}` : ''}
              </span>
            </div>
            <div className="archive-panel__field">
              <span className="archive-panel__field-label">Added</span>
              <span className="archive-panel__field-value">
                {item.created_at?.slice(0, 10)}
              </span>
            </div>
            {item.submitter_note && (
              <div className="archive-panel__field">
                <span className="archive-panel__field-label">Note</span>
                <span className="archive-panel__field-value">
                  {item.submitter_note}
                </span>
              </div>
            )}
            <div className="archive-panel__field">
              <span className="archive-panel__field-label">Source</span>
              <a
                className="archive-panel__field-value archive-panel__link"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {item.url}
              </a>
            </div>
          </div>

          <a
            className="archive-panel__view-btn"
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            View Source →
          </a>
        </div>
      </div>
    </div>
  )
}
