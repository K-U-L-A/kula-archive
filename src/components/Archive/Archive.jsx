import { useState } from 'react'
import './Archive.css'

const CATEGORIES = [
  { id: 'video', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'image', label: 'Image' },
  { id: 'text', label: 'Text' },
  { id: 'web', label: 'Web' },
]

const VIDEO_COLLECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'found-footage', label: 'Found Footage' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'films', label: 'Films' },
]

export default function Archive() {
  const [activeType, setActiveType] = useState('video')
  const [activeCollection, setActiveCollection] = useState('all')

  function handleTypeChange(type) {
    setActiveType(type)
    setActiveCollection('all')
  }

  return (
    <section id="archive" className="archive section-anchor">
      <div className="archive__intro">
        <h2 className="section-label">Archive</h2>
      </div>

      <nav className="archive__tabs">
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`archive__tab${activeType === id ? ' is-active' : ''}`}
            onClick={() => handleTypeChange(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {activeType === 'video' && (
        <nav className="archive__collections">
          {VIDEO_COLLECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`archive__collection-tab${activeCollection === id ? ' is-active' : ''}`}
              onClick={() => setActiveCollection(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      )}

      <div className="archive__items">
        <p className="archive__empty">
          Nothing here yet.
          <span className="ko">아직 아무것도 없습니다.</span>
        </p>
      </div>
    </section>
  )
}
