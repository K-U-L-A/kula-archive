import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { getArenaBlocks } from '../../lib/arena'
import FieldNotes from '../FieldNotes/FieldNotes'
import ArchiveSubmit from './ArchiveSubmit'
import ArchiveDetailPanel from './ArchiveDetailPanel'
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

export default function Archive({ highlightedItemId }) {
  const [activeType, setActiveType] = useState('video')
  const [activeCollection, setActiveCollection] = useState('all')
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    async function loadItems() {
      const [supabaseRes, arenaBlocks] = await Promise.all([
        supabase
          .from('archive_submissions')
          .select('*')
          .eq('status', 'approved')
          .order('sort_order', { ascending: true }),
        getArenaBlocks(),
      ])

      const supabaseItems = (supabaseRes.data ?? []).map((item) => ({
        ...item,
        source: 'supabase',
      }))

      const merged = [...supabaseItems, ...arenaBlocks].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )

      setItems(merged)
    }

    loadItems()
  }, [])

  useEffect(() => {
    if (!highlightedItemId) return
    const el = document.getElementById(`archive-item-${highlightedItemId}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [highlightedItemId, items])

  useEffect(() => {
    if (!highlightedItemId || items.length === 0) return
    const found = items.find((item) => item.id === highlightedItemId)
    if (found) setSelectedItem(found)
  }, [highlightedItemId, items])

  function handleTypeChange(type) {
    setActiveType(type)
    setActiveCollection('all')
  }

  const filteredItems = items.filter((item) => {
    if (item.type !== activeType) return false
    if (activeType === 'video' && activeCollection !== 'all') {
      return item.collection === activeCollection
    }
    return true
  })

  return (
    <>
      <section id="archive" className="archive section-anchor">
        <div className="archive__intro">
          <h2 className="section-label">Archive</h2>
          <p className="archive__desc">
            Paste a link! It goes into the archive — Anyone can browse and download...
            <span className="pixel-popup__glyph">◌𓈒𖡼</span>
          </p>
        </div>

        <ArchiveSubmit />

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
          {filteredItems.length === 0 ? (
            <p className="archive__empty">
              Nothing here yet.
              <span className="ko">아직 아무것도 없습니다.</span>
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                id={`archive-item-${item.id}`}
                className={`archive-item${highlightedItemId === item.id ? ' archive-item--highlighted' : ''}`}
                onClick={() => setSelectedItem(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="archive-item__thumb">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title ?? ''} />
                  ) : (
                    <div className="archive-item__thumb-empty" />
                  )}
                </div>
                <p className="archive-item__label">
                  {item.title ?? item.url}
                </p>
              </div>
            ))
          )}
        </div>
        {selectedItem && (
          <ArchiveDetailPanel
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </section>
      <FieldNotes />
    </>
  )
}
