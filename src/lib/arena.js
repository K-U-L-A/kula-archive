const ARENA_TOKEN = import.meta.env.VITE_ARENA_TOKEN
const ARENA_CHANNEL = import.meta.env.VITE_ARENA_CHANNEL || 'archive-for-kula'

export async function getArenaBlocks() {
  const res = await fetch(
    `https://api.are.na/v2/channels/${ARENA_CHANNEL}/contents?per=100`,
    { headers: { Authorization: `Bearer ${ARENA_TOKEN}` } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data.contents ?? []).map((block) => ({
    id: `arena-${block.id}`,
    title: block.title || block.generated_title || null,
    thumbnail: block.image?.thumb?.url || block.image?.original?.url || null,
    url: block.source?.url || `https://www.are.na/block/${block.id}`,
    type: arenaTypeToKula(block.class),
    collection: null,
    created_at: block.created_at,
    source: 'arena',
  }))
}

function arenaTypeToKula(arenaClass) {
  switch (arenaClass) {
    case 'Image': return 'image'
    case 'Video': return 'video'
    case 'Attachment': return 'text'
    case 'Link': return 'web'
    case 'Text': return 'text'
    case 'Media': return 'audio'
    default: return 'web'
  }
}
