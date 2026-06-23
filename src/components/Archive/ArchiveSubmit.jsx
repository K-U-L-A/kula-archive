import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import './ArchiveSubmit.css'

const CATEGORIES = [
  { id: 'video', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'image', label: 'Image' },
  { id: 'text', label: 'Text' },
  { id: 'web', label: 'Web' },
]

const VIDEO_COLLECTIONS = [
  { id: 'found-footage', label: 'Found Footage' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'films', label: 'Films' },
]

export default function ArchiveSubmit() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('video')
  const [collection, setCollection] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!url.trim()) return
    setLoading(true)
    setStatus(null)

    let thumbnail = null

    try {
      const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
      )
      if (ytMatch) {
        const videoId = ytMatch[1]
        thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      }
    } catch (_) {}

    const { error } = await supabase
      .from('archive_submissions')
      .insert({
        url: url.trim(),
        title: title.trim() || null,
        thumbnail,
        type,
        collection: type === 'video' ? collection || null : null,
        submitter_note: note.trim() || null,
        status: 'pending',
      })

    setLoading(false)

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setUrl('')
      setTitle('')
      setNote('')
      setCollection('')
    }
  }

  return (
    <div className="archive-submit">

      <div className="archive-submit__row">
        <input
          className="archive-submit__input"
          type="url"
          placeholder="https://"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="archive-submit__row">
        <input
          className="archive-submit__input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="archive-submit__row">
        {CATEGORIES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`archive-submit__type${type === id ? ' is-active' : ''}`}
            onClick={() => { setType(id); setCollection('') }}
          >
            {label}
          </button>
        ))}
      </div>

      {type === 'video' && (
        <div className="archive-submit__row">
          {VIDEO_COLLECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`archive-submit__collection${collection === id ? ' is-active' : ''}`}
              onClick={() => setCollection(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="archive-submit__row">
        <input
          className="archive-submit__input"
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="archive-submit__btn"
        onClick={handleSubmit}
        disabled={loading || !url.trim()}
      >
        {loading ? '...' : 'Submit'}
      </button>

      {status === 'success' && (
        <p className="archive-submit__msg">
          Received. Under review.
          <span className="ko">접수됐습니다. 검토 후 게시됩니다.</span>
        </p>
      )}
      {status === 'error' && (
        <p className="archive-submit__msg archive-submit__msg--error">
          Something went wrong.
          <span className="ko">오류가 발생했습니다.</span>
        </p>
      )}
    </div>
  )
}
