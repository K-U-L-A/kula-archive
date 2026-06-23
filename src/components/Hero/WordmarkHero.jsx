import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { getArenaBlocks } from '../../lib/arena'
import { getTileDepth, getWordmark } from '../../wordmark'
import '../../styles/wordmark.css'
import WorkshopPixelPopup from './WorkshopPixelPopup'

const WORDMARK = getWordmark('KULA')
const PAGE_PADDING = 48
const HERO_FILL = 0.88
const COMPOSITION_MARGIN = 0.94

const MAGNET_RADIUS = 210
const MAGNET_MIN_OFFSET = 2
const MAGNET_MAX_OFFSET = 8
const MAGNET_LERP = 0.1
const MAGNET_RETURN_LERP = 0.075
const MAGNET_SETTLE_EPSILON = 0.04

const TILE_MAGNET_DATA = WORDMARK.tiles.map(({ id, x, y, size }) => ({
  id,
  size,
  cx: x + size / 2,
  cy: y + size / 2,
}))

function magneticMaxOffset(size) {
  const minSize = 36
  const maxSize = 140
  const t = Math.min(1, Math.max(0, (size - minSize) / (maxSize - minSize)))
  return MAGNET_MAX_OFFSET - t * (MAGNET_MAX_OFFSET - MAGNET_MIN_OFFSET)
}

function magneticTarget(tile, cursorX, cursorY, scale) {
  const screenDx = (cursorX - tile.cx) * scale
  const screenDy = (cursorY - tile.cy) * scale
  const screenDist = Math.hypot(screenDx, screenDy)

  if (screenDist > MAGNET_RADIUS) {
    return { tx: 0, ty: 0 }
  }

  const falloff = 1 - screenDist / MAGNET_RADIUS
  const eased = falloff * falloff
  const maxOff = magneticMaxOffset(tile.size)
  const localMaxOff = maxOff / scale
  const dirX = cursorX - tile.cx
  const dirY = cursorY - tile.cy
  const dirLength = Math.hypot(dirX, dirY) || 1
  let tx = (dirX / dirLength) * localMaxOff * eased
  let ty = (dirY / dirLength) * localMaxOff * eased
  const magnitude = Math.hypot(tx, ty)

  if (magnitude > localMaxOff) {
    tx = (tx / magnitude) * localMaxOff
    ty = (ty / magnitude) * localMaxOff
  }

  return { tx, ty }
}

function useMagneticFrames(scale, wordmarkRef) {
  const tileRefs = useRef(new Map())
  const offsetsRef = useRef(new Map())
  const animatingRef = useRef(new Set())
  const cursorRef = useRef({ x: -9999, y: -9999, active: false })
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const offsets = offsetsRef.current
    const animating = animatingRef.current
    const cursor = cursorRef.current
    const tiles = tileRefs.current

    function applyTransform(id, x, y) {
      const element = tileRefs.current.get(id)
      if (!element) return

      if (Math.abs(x) < 0.01 && Math.abs(y) < 0.01) {
        element.style.transform = ''
        return
      }

      element.style.transform = `translate(${x}px, ${y}px)`
    }

    function ensureOffset(id) {
      if (!offsets.has(id)) {
        offsets.set(id, { x: 0, y: 0, tx: 0, ty: 0 })
      }
      return offsets.get(id)
    }

    function markAnimating(id) {
      animating.add(id)
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    function updateNearbyTargets() {
      const nearby = new Set()

      for (const tile of TILE_MAGNET_DATA) {
        const screenDx = (cursor.x - tile.cx) * scale
        const screenDy = (cursor.y - tile.cy) * scale
        const inRange = Math.hypot(screenDx, screenDy) <= MAGNET_RADIUS
        const offset = offsets.get(tile.id)
        const isSettling =
          offset &&
          (Math.abs(offset.x) > MAGNET_SETTLE_EPSILON ||
            Math.abs(offset.y) > MAGNET_SETTLE_EPSILON)

        if (!inRange && !isSettling) {
          continue
        }

        if (inRange) {
          nearby.add(tile.id)
        }

        const next = ensureOffset(tile.id)
        const target = cursor.active
          ? magneticTarget(tile, cursor.x, cursor.y, scale)
          : { tx: 0, ty: 0 }

        next.tx = target.tx
        next.ty = target.ty
        markAnimating(tile.id)
      }

      for (const id of animating) {
        if (nearby.has(id)) continue
        const offset = offsets.get(id)
        if (!offset) continue
        offset.tx = 0
        offset.ty = 0
      }
    }

    function tick() {
      rafRef.current = null

      for (const id of animating) {
        const offset = offsets.get(id)
        if (!offset) {
          animating.delete(id)
          continue
        }

        const lerp = cursor.active ? MAGNET_LERP : MAGNET_RETURN_LERP
        offset.x += (offset.tx - offset.x) * lerp
        offset.y += (offset.ty - offset.y) * lerp

        const settled =
          Math.abs(offset.tx - offset.x) < MAGNET_SETTLE_EPSILON &&
          Math.abs(offset.ty - offset.y) < MAGNET_SETTLE_EPSILON

        if (settled) {
          offset.x = offset.tx
          offset.y = offset.ty
        }

        applyTransform(id, offset.x, offset.y)

        if (
          offset.tx === 0 &&
          offset.ty === 0 &&
          Math.abs(offset.x) < MAGNET_SETTLE_EPSILON &&
          Math.abs(offset.y) < MAGNET_SETTLE_EPSILON
        ) {
          offset.x = 0
          offset.y = 0
          applyTransform(id, 0, 0)
          animating.delete(id)
        }
      }

      if (animating.size > 0) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    function onPointerMove(event) {
      const wordmark = wordmarkRef.current
      if (!wordmark) return

      const rect = wordmark.getBoundingClientRect()
      cursor.active = true
      cursor.x = (event.clientX - rect.left) / scale
      cursor.y = (event.clientY - rect.top) / scale
      updateNearbyTargets()
    }

    function onPointerLeave() {
      cursor.active = false
      updateNearbyTargets()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      animating.clear()
      offsets.clear()
      for (const element of tiles.values()) {
        element.style.transform = ''
      }
    }
  }, [scale, wordmarkRef])

  const registerTile = useCallback((id) => {
    return (element) => {
      if (element) {
        tileRefs.current.set(id, element)
        return
      }
      tileRefs.current.delete(id)
    }
  }, [])

  return registerTile
}

function useWordmarkScale({ letterWidth, letterHeight, width, height }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function readNavHeight() {
      const value = getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
      return Number.parseFloat(value) || 52
    }

    function updateScale() {
      const navHeight = readNavHeight()
      const availableWidth = window.innerWidth - PAGE_PADDING * 2
      const availableHeight = window.innerHeight - PAGE_PADDING * 2 - navHeight

      setScale(
        Math.min(
          (availableWidth * HERO_FILL) / letterWidth,
          (availableWidth * COMPOSITION_MARGIN) / width,
          (availableHeight * HERO_FILL) / letterHeight,
          (availableHeight * COMPOSITION_MARGIN) / height,
        ),
      )
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [letterWidth, letterHeight, width, height])

  return scale
}

export default function WordmarkHero({ onGoToArchiveItem }) {
  const scale = useWordmarkScale(WORDMARK)
  const wordmarkRef = useRef(null)
  const registerTile = useMagneticFrames(scale, wordmarkRef)
  const [activeId, setActiveId] = useState(null)
  const [activeWorkshop, setActiveWorkshop] = useState(null)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    async function loadSubmissions() {
      const [supabaseRes, arenaBlocks] = await Promise.all([
        supabase
          .from('archive_submissions')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: true }),
        getArenaBlocks(),
      ])

      const supabaseItems = (supabaseRes.data ?? []).map((item) => ({
        ...item,
        source: 'supabase',
      }))

      const merged = [...supabaseItems, ...arenaBlocks].filter(
        (item) => item.thumbnail
      )

      setSubmissions(merged)
    }

    loadSubmissions()
  }, [])

  const primaryLetterTiles = WORDMARK.tiles.filter(
    (t) => t.kind === 'letter' && !t.id.includes('accent')
  )

  function seededShuffle(arr) {
    const result = [...arr]
    let seed = 42
    function rand() {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff
      return (seed >>> 0) / 0xffffffff
    }
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }

  const shuffledTiles = seededShuffle(primaryLetterTiles)

  const tileSubmissionMap = new Map(
    submissions
      .map((submission, i) => [shuffledTiles[i]?.id, submission])
      .filter(([id]) => id !== undefined)
  )

  const stageWidth = WORDMARK.width * scale
  const stageHeight = WORDMARK.height * scale

  function handleTileClick(event, id) {
    const submission = tileSubmissionMap.get(id) ?? null
    const rect = event.currentTarget.getBoundingClientRect()
    setPopupPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setActiveWorkshop(submission)
    setActiveId(id)
  }

  return (
    <>
      <div
        className="wordmark-stage"
        style={{
          width: stageWidth,
          height: stageHeight,
        }}
      >
        <div
          ref={wordmarkRef}
          className="wordmark"
          role="img"
          aria-label="KULA"
          style={{
            width: WORDMARK.width,
            height: WORDMARK.height,
            transform: `scale(${scale})`,
          }}
        >
          {WORDMARK.tiles.map(({ id, x, y, size, kind }) => {
            const depth = getTileDepth(size)
            const submission = tileSubmissionMap.get(id)

            return (
              <button
                key={id}
                ref={registerTile(id)}
                type="button"
                className={[
                  'pixel',
                  kind === 'debris' ? 'pixel--debris' : '',
                  submission ? 'pixel--workshop' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-label={submission ? (submission.title ?? submission.url) : `${kind} pixel ${id}`}
                style={{
                  left: x,
                  top: y,
                  width: size,
                  height: size,
                  zIndex: submission
                    ? 9000 + (submissions.length - submissions.findIndex(s => s.id === submission.id))
                    : Math.round(y + x),
                  '--depth': `${depth}px`,
                  pointerEvents: 'auto',
                  cursor: tileSubmissionMap.get(id) ? 'pointer' : 'default',
                }}
                onClick={(e) => handleTileClick(e, id)}
              >
                {submission?.thumbnail && (
                  <div className="pixel__thumb-wrap">
                    <img
                      src={submission.thumbnail}
                      alt=""
                      className="pixel__thumb-img"
                      draggable={false}
                    />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {activeId !== null && (
        <WorkshopPixelPopup
          workshop={activeWorkshop}
          position={popupPos}
          onClose={() => {
            setActiveId(null)
            setActiveWorkshop(null)
          }}
          onGoToArchive={onGoToArchiveItem}
        />
      )}
    </>
  )
}
