export const GRID_CELL = 47
export const MODULE_GAP = 14
export const GRID_STEP = GRID_CELL + MODULE_GAP
export const LETTER_GAP = 10
export const DOWNSCALE_FACTOR = 1

export const MODULE_SCALE = {
  TINY: 0.64,
  SMALL: 0.82,
  MEDIUM: 1,
  LARGE: 1.28,
  EXTRA_LARGE: 1.62,
  HERO: 2.15,
  MONUMENT: 2.75,
  COLOSSAL: 3.35,
}

export function getTileDepth(size) {
  if (size <= GRID_CELL * 0.95) return 2
  if (size <= GRID_CELL * 1.3) return 3
  if (size <= GRID_CELL * 1.9) return 3
  return 4
}

const MASTER_LETTERS = {
  K: [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  ],
  U: [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  L: [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  A: [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  ],
}

// Twelve mandatory placement zones from annotated art direction (Jun 20).
const MANDATORY_FIELD_ZONES = [
  { id: 'zone-01-top-far-left', nx: -0.13, ny: -0.4, profile: 'mixed-six', density: 'normal' },
  { id: 'zone-02-top-k-u', nx: 0.19, ny: -0.36, profile: 'large-two-small', density: 'normal' },
  { id: 'zone-03-top-u', nx: 0.38, ny: -0.4, profile: 'seven-curated', density: 'wide' },
  { id: 'zone-04-top-u-l', nx: 0.52, ny: -0.35, profile: 'medium-triple', density: 'normal' },
  { id: 'zone-05-top-far-right', nx: 0.95, ny: -0.32, profile: 'mixed-five', density: 'normal' },
  { id: 'zone-06-right-a', nx: 1.05, ny: 0.14, profile: 'hero-cluster', density: 'normal' },
  { id: 'zone-07-between-l-a', nx: 0.7, ny: 0.5, profile: 'seven-curated', density: 'wide' },
  { id: 'zone-08-left-k', nx: -0.09, ny: 0.44, profile: 'medium-triple', density: 'sparse' },
  { id: 'zone-09-below-k', nx: 0.06, ny: 1.2, profile: 'mixed-five', density: 'wide' },
  { id: 'zone-10-below-u', nx: 0.37, ny: 1.22, profile: 'medium-triple', density: 'normal' },
  { id: 'zone-11-below-a', nx: 0.86, ny: 1.26, profile: 'seven-curated', density: 'wide' },
  { id: 'zone-12-corner-br', nx: 1.12, ny: 1.24, profile: 'breakaway-large', density: 'sparse' },
]

// Supplementary drifting archive clusters — asymmetric, upper/lower weighted.
const DRIFTING_ARCHIVE_CLUSTERS = [
  { id: 'drift-u01', nx: -0.1, ny: -0.54, profile: 'monument-satellites', density: 'wide' },
  { id: 'drift-u02', nx: 0.08, ny: -0.46, profile: 'oversized-pair', density: 'normal' },
  { id: 'drift-u03', nx: 0.26, ny: -0.58, profile: 'mixed-drift', density: 'wide' },
  { id: 'drift-u04', nx: 0.44, ny: -0.5, profile: 'breakaway-large', density: 'normal' },
  { id: 'drift-u05', nx: 0.61, ny: -0.56, profile: 'scattered-five', density: 'wide' },
  { id: 'drift-u06', nx: 0.78, ny: -0.44, profile: 'monument-single', density: 'sparse' },
  { id: 'drift-u07', nx: 0.98, ny: -0.52, profile: 'mixed-drift', density: 'normal' },
  { id: 'drift-u08', nx: 0.16, ny: -0.26, profile: 'oversized-pair', density: 'sparse' },
  { id: 'drift-u09', nx: 0.52, ny: -0.24, profile: 'breakaway-large', density: 'sparse' },
  { id: 'drift-u10', nx: 0.88, ny: -0.28, profile: 'scattered-five', density: 'sparse' },
  { id: 'drift-l01', nx: -0.06, ny: 1.4, profile: 'breakaway-large', density: 'wide' },
  { id: 'drift-l02', nx: 0.14, ny: 1.48, profile: 'monument-satellites', density: 'wide' },
  { id: 'drift-l03', nx: 0.31, ny: 1.36, profile: 'mixed-drift', density: 'normal' },
  { id: 'drift-l04', nx: 0.5, ny: 1.44, profile: 'oversized-pair', density: 'normal' },
  { id: 'drift-l05', nx: 0.67, ny: 1.38, profile: 'scattered-five', density: 'wide' },
  { id: 'drift-l06', nx: 0.84, ny: 1.46, profile: 'monument-single', density: 'sparse' },
  { id: 'drift-l07', nx: 1.04, ny: 1.34, profile: 'breakaway-large', density: 'normal' },
  { id: 'drift-l08', nx: 0.22, ny: 1.12, profile: 'mixed-drift', density: 'sparse' },
  { id: 'drift-l09', nx: 0.58, ny: 1.1, profile: 'oversized-pair', density: 'sparse' },
  { id: 'drift-l10', nx: 0.92, ny: 1.14, profile: 'monument-satellites', density: 'sparse' },
  { id: 'drift-s01', nx: -0.17, ny: 0.06, profile: 'oversized-pair', density: 'sparse' },
  { id: 'drift-s02', nx: -0.14, ny: 0.72, profile: 'breakaway-large', density: 'normal' },
  { id: 'drift-s03', nx: 1.1, ny: 0.58, profile: 'mixed-drift', density: 'sparse' },
  { id: 'drift-s04', nx: 0.66, ny: 0.06, profile: 'scattered-five', density: 'sparse' },
  { id: 'drift-s05', nx: -0.11, ny: 1.02, profile: 'monument-single', density: 'sparse' },
  { id: 'drift-s06', nx: 1.08, ny: 0.92, profile: 'oversized-pair', density: 'sparse' },
]

function downscaleShape(shape, factor) {
  if (factor <= 1) return shape

  const height = Math.ceil(shape.length / factor)
  const width = Math.ceil(shape[0].length / factor)

  return Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => {
      for (let rowOffset = 0; rowOffset < factor; rowOffset += 1) {
        for (let colOffset = 0; colOffset < factor; colOffset += 1) {
          if (shape[row * factor + rowOffset]?.[col * factor + colOffset]) {
            return 1
          }
        }
      }
      return 0
    }),
  )
}

function getLetterShape(letter) {
  const master = MASTER_LETTERS[letter]
  if (!master) return null
  return downscaleShape(master, DOWNSCALE_FACTOR)
}

function hash(seed) {
  let value = seed | 0
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d)
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b)
  value ^= value >>> 16
  return (value >>> 0) / 4294967295
}

function pickFrameScale(seed) {
  const roll = hash(seed)

  if (roll < 0.1) return MODULE_SCALE.SMALL
  if (roll < 0.25) return 0.91
  if (roll < 0.45) return MODULE_SCALE.MEDIUM
  if (roll < 0.62) return 1.12
  if (roll < 0.76) return MODULE_SCALE.LARGE
  if (roll < 0.88) return MODULE_SCALE.EXTRA_LARGE
  if (roll < 0.95) return 1.88
  return MODULE_SCALE.HERO
}

function frameSizeFromScale(scale) {
  return GRID_CELL * scale
}

function pickLetterTileSize(seed) {
  return frameSizeFromScale(pickFrameScale(seed))
}

function pickAccentTileSize(seed) {
  const roll = hash(seed)
  if (roll < 0.55) return GRID_CELL * 0.56
  if (roll < 0.85) return GRID_CELL * 0.66
  return GRID_CELL * 0.74
}

function pickFieldTileSize(seed, bias = 'mixed') {
  const roll = hash(seed)

  if (bias === 'colossal') {
    if (roll < 0.55) return frameSizeFromScale(MODULE_SCALE.COLOSSAL)
    if (roll < 0.85) return frameSizeFromScale(MODULE_SCALE.MONUMENT)
    return frameSizeFromScale(MODULE_SCALE.HERO)
  }

  if (bias === 'monument') {
    if (roll < 0.45) return frameSizeFromScale(MODULE_SCALE.MONUMENT)
    if (roll < 0.78) return frameSizeFromScale(MODULE_SCALE.HERO)
    if (roll < 0.94) return frameSizeFromScale(MODULE_SCALE.COLOSSAL)
    return frameSizeFromScale(MODULE_SCALE.EXTRA_LARGE)
  }

  if (bias === 'oversized') {
    if (roll < 0.3) return frameSizeFromScale(MODULE_SCALE.EXTRA_LARGE)
    if (roll < 0.62) return frameSizeFromScale(MODULE_SCALE.HERO)
    if (roll < 0.86) return frameSizeFromScale(MODULE_SCALE.MONUMENT)
    return frameSizeFromScale(MODULE_SCALE.LARGE)
  }

  if (bias === 'hero' || bias === 'hero-single') {
    if (roll < 0.4) return frameSizeFromScale(MODULE_SCALE.HERO)
    if (roll < 0.72) return frameSizeFromScale(MODULE_SCALE.MONUMENT)
    if (roll < 0.9) return frameSizeFromScale(MODULE_SCALE.EXTRA_LARGE)
    return frameSizeFromScale(MODULE_SCALE.COLOSSAL)
  }

  if (bias === 'large') {
    if (roll < 0.28) return frameSizeFromScale(MODULE_SCALE.MONUMENT)
    if (roll < 0.52) return frameSizeFromScale(MODULE_SCALE.EXTRA_LARGE)
    if (roll < 0.78) return frameSizeFromScale(MODULE_SCALE.HERO)
    return frameSizeFromScale(MODULE_SCALE.LARGE)
  }

  if (bias === 'medium') {
    if (roll < 0.35) return frameSizeFromScale(MODULE_SCALE.LARGE)
    if (roll < 0.62) return frameSizeFromScale(MODULE_SCALE.MEDIUM)
    if (roll < 0.82) return frameSizeFromScale(MODULE_SCALE.EXTRA_LARGE)
    return frameSizeFromScale(MODULE_SCALE.SMALL)
  }

  if (bias === 'small') {
    if (roll < 0.55) return frameSizeFromScale(MODULE_SCALE.SMALL)
    if (roll < 0.82) return frameSizeFromScale(MODULE_SCALE.MEDIUM)
    return frameSizeFromScale(MODULE_SCALE.LARGE)
  }

  if (bias === 'drift') {
    if (roll < 0.12) return frameSizeFromScale(MODULE_SCALE.TINY)
    if (roll < 0.28) return frameSizeFromScale(MODULE_SCALE.SMALL)
    if (roll < 0.48) return frameSizeFromScale(MODULE_SCALE.MEDIUM)
    if (roll < 0.68) return frameSizeFromScale(MODULE_SCALE.LARGE)
    if (roll < 0.84) return frameSizeFromScale(MODULE_SCALE.HERO)
    if (roll < 0.94) return frameSizeFromScale(MODULE_SCALE.MONUMENT)
    return frameSizeFromScale(MODULE_SCALE.COLOSSAL)
  }

  return pickLetterTileSize(seed)
}

function organicSpacingOffset(seed) {
  if (hash(seed + 47) > 0.48) {
    return { x: 0, y: 0 }
  }

  const amount = 2 + Math.floor(hash(seed + 53) * 5)
  const signX = hash(seed + 59) < 0.5 ? -1 : 1
  const signY = hash(seed + 61) < 0.5 ? -1 : 1
  const axis = hash(seed + 67)

  if (axis < 0.35) return { x: signX * amount, y: 0 }
  if (axis < 0.7) return { x: 0, y: signY * amount }
  return {
    x: signX * Math.round(amount * 0.75),
    y: signY * Math.round(amount * 0.75),
  }
}

function microOffset(seed) {
  if (hash(seed + 71) > 0.38) {
    return { x: 0, y: 0 }
  }

  const amount = 1 + Math.floor(hash(seed + 73) * 4)
  const sign = hash(seed + 79) < 0.5 ? -1 : 1
  const axis = hash(seed + 67)

  if (axis < 0.33) return { x: sign * amount, y: 0 }
  if (axis < 0.66) return { x: 0, y: sign * amount }
  return {
    x: sign * amount,
    y: sign * amount * (hash(seed + 83) < 0.5 ? -1 : 1),
  }
}

function createTile({ id, x, y, size, kind, letter }) {
  return { id, x, y, size, kind, letter }
}

function tileFromGridSlot(gridCol, gridRow, size, seed = 0, jitter = false, jitterScale = 0.75) {
  const slotCenterX = gridCol * GRID_STEP + GRID_STEP / 2
  const slotCenterY = gridRow * GRID_STEP + GRID_STEP / 2
  const sizeRatio = size / GRID_CELL
  const maxJitter = jitter ? Math.min(MODULE_GAP * jitterScale, MODULE_GAP * 0.95) : 0
  const jx = jitter ? Math.round((hash(seed + 11) - 0.5) * maxJitter * 2) : 0
  const jy = jitter ? Math.round((hash(seed + 17) - 0.5) * maxJitter * 2) : 0
  const spacing = organicSpacingOffset(seed)
  const micro = microOffset(seed)
  const sizeNudge = sizeRatio > 1.35 ? 2 : 3

  return {
    x:
      slotCenterX -
      size / 2 +
      jx +
      spacing.x +
      micro.x +
      Math.round((hash(seed + 31) - 0.5) * sizeNudge * 2),
    y:
      slotCenterY -
      size / 2 +
      jy +
      spacing.y +
      micro.y +
      Math.round((hash(seed + 37) - 0.5) * sizeNudge * 2),
    size,
  }
}

function placeGridTile(
  tiles,
  { id, gridCol, gridRow, kind, letter, seed, sizePicker, jitter = false, jitterScale = 0.75 },
) {
  const size = sizePicker(seed)
  const { x, y } = tileFromGridSlot(gridCol, gridRow, size, seed, jitter, jitterScale)

  tiles.push(
    createTile({
      id,
      x,
      y,
      size,
      kind,
      letter,
    }),
  )
}

function addLetterTiles(tiles, shape, offsetCol, letter) {
  shape.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell) return

      const gridCol = offsetCol + colIndex
      const seed =
        Math.imul(gridCol + 11, 997) ^
        Math.imul(rowIndex + 7, 991) ^
        letter.charCodeAt(0)

      placeGridTile(tiles, {
        id: `${letter}-${rowIndex}-${colIndex}`,
        gridCol,
        gridRow: rowIndex,
        kind: 'letter',
        letter,
        seed,
        sizePicker: pickLetterTileSize,
        jitter: true,
        jitterScale: 0.1,
      })

      if (hash(seed + 401) > 0.8) return

      const accentSeed = seed ^ 0x5bf036cd
      const accentSize = pickAccentTileSize(accentSeed)
      const { x, y } = tileFromGridSlot(gridCol, rowIndex, accentSize, accentSeed, true, 0.22)
      const driftX = Math.round((hash(accentSeed + 3) - 0.5) * GRID_CELL * 0.22)
      const driftY = Math.round((hash(accentSeed + 5) - 0.5) * GRID_CELL * 0.22)

      tiles.push(
        createTile({
          id: `${letter}-accent-${rowIndex}-${colIndex}`,
          x: x + driftX,
          y: y + driftY,
          size: accentSize,
          kind: 'letter',
          letter,
        }),
      )
    })
  })
}

function getLetterBounds(tiles) {
  const letterTiles = tiles.filter((tile) => tile.kind === 'letter')
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  letterTiles.forEach((tile) => {
    const depth = getTileDepth(tile.size)
    minX = Math.min(minX, tile.x)
    minY = Math.min(minY, tile.y)
    maxX = Math.max(maxX, tile.x + tile.size + depth)
    maxY = Math.max(maxY, tile.y + tile.size + depth)
  })

  const minCol = Math.floor(minX / GRID_STEP)
  const maxCol = Math.ceil(maxX / GRID_STEP) - 1
  const minRow = Math.floor(minY / GRID_STEP)
  const maxRow = Math.ceil(maxY / GRID_STEP) - 1

  return {
    minX,
    minY,
    maxX,
    maxY,
    minCol,
    maxCol,
    minRow,
    maxRow,
    centerCol: (minCol + maxCol) / 2,
    centerRow: (minRow + maxRow) / 2,
    letterTiles,
    letterWidth: maxX - minX,
    letterHeight: maxY - minY,
    letterCenterX: (minX + maxX) / 2,
    letterCenterY: (minY + maxY) / 2,
  }
}

function overlapsAny(tile, tiles) {
  return tiles.some((other) => {
    return !(
      tile.x + tile.size <= other.x ||
      other.x + other.size <= tile.x ||
      tile.y + tile.size <= other.y ||
      other.y + other.size <= tile.y
    )
  })
}

function overlapsLetters(tile, letterTiles) {
  return overlapsAny(tile, letterTiles)
}

function tryPlaceDebrisAt(
  tiles,
  debrisTiles,
  letterTiles,
  { id, x, y, size, allowDebrisOverlap = true },
) {
  const candidate = createTile({
    id,
    x,
    y,
    size,
    kind: 'debris',
    letter: 'archive',
  })

  if (
    !overlapsLetters(candidate, letterTiles) &&
    (allowDebrisOverlap || !overlapsAny(candidate, debrisTiles))
  ) {
    debrisTiles.push(candidate)
    tiles.push(candidate)
    return true
  }

  return false
}

function constellationSpec(profile) {
  switch (profile) {
    case 'large-two-small':
      return [
        { bias: 'oversized', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.38, oy: 0.28 },
        { bias: 'medium', ox: -0.32, oy: 0.34 },
      ]
    case 'mixed-five':
      return [
        { bias: 'large', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.34, oy: 0.18 },
        { bias: 'oversized', ox: -0.28, oy: 0.24 },
        { bias: 'medium', ox: 0.46, oy: -0.16 },
        { bias: 'small', ox: -0.4, oy: -0.12 },
      ]
    case 'mixed-six':
      return [
        { bias: 'medium', ox: 0, oy: 0 },
        { bias: 'large', ox: 0.36, oy: 0.16 },
        { bias: 'small', ox: -0.3, oy: 0.22 },
        { bias: 'oversized', ox: 0.48, oy: -0.14 },
        { bias: 'small', ox: -0.42, oy: -0.1 },
        { bias: 'medium', ox: 0.12, oy: 0.42 },
      ]
    case 'hero-scattered':
      return [
        { bias: 'hero', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.5, oy: 0.24 },
        { bias: 'small', ox: -0.42, oy: 0.3 },
        { bias: 'medium', ox: 0.24, oy: -0.34 },
        { bias: 'small', ox: -0.3, oy: -0.26 },
        { bias: 'small', ox: 0.54, oy: -0.16 },
      ]
    case 'seven-curated':
      return [
        { bias: 'monument', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.52, oy: 0.32 },
        { bias: 'medium', ox: -0.44, oy: 0.38 },
        { bias: 'large', ox: 0.28, oy: -0.4 },
        { bias: 'small', ox: -0.34, oy: -0.26 },
        { bias: 'oversized', ox: 0.58, oy: -0.18 },
        { bias: 'small', ox: -0.16, oy: 0.54 },
      ]
    case 'hero-single':
      return [{ bias: 'monument', ox: 0, oy: 0 }]
    case 'hero-cluster':
      return [
        { bias: 'monument', ox: 0, oy: 0 },
        { bias: 'oversized', ox: 0.42, oy: 0.34 },
        { bias: 'medium', ox: -0.32, oy: 0.44 },
        { bias: 'small', ox: 0.56, oy: -0.2 },
      ]
    case 'medium-triple':
      return [
        { bias: 'large', ox: 0, oy: 0 },
        { bias: 'medium', ox: 0.4, oy: 0.26 },
        { bias: 'oversized', ox: -0.3, oy: 0.32 },
      ]
    case 'breakaway-large':
      return [
        { bias: 'monument', ox: 0, oy: 0 },
        { bias: 'medium', ox: 0.58, oy: 0.22 },
        { bias: 'small', ox: -0.48, oy: 0.36 },
        { bias: 'large', ox: 0.34, oy: -0.42 },
      ]
    case 'monument-satellites':
      return [
        { bias: 'colossal', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.62, oy: 0.28 },
        { bias: 'medium', ox: -0.52, oy: 0.34 },
        { bias: 'small', ox: 0.18, oy: -0.48 },
      ]
    case 'monument-single':
      return [{ bias: 'colossal', ox: 0, oy: 0 }]
    case 'oversized-pair':
      return [
        { bias: 'oversized', ox: 0, oy: 0 },
        { bias: 'large', ox: 0.52, oy: 0.38 },
        { bias: 'small', ox: -0.36, oy: 0.18 },
      ]
    case 'mixed-drift':
      return [
        { bias: 'drift', ox: 0, oy: 0 },
        { bias: 'drift', ox: 0.44, oy: 0.2 },
        { bias: 'oversized', ox: -0.38, oy: 0.28 },
        { bias: 'drift', ox: 0.22, oy: -0.36 },
        { bias: 'medium', ox: -0.24, oy: -0.18 },
      ]
    case 'scattered-five':
      return [
        { bias: 'large', ox: 0, oy: 0 },
        { bias: 'drift', ox: 0.5, oy: 0.24 },
        { bias: 'medium', ox: -0.42, oy: 0.3 },
        { bias: 'oversized', ox: 0.28, oy: -0.38 },
        { bias: 'small', ox: -0.18, oy: -0.22 },
      ]
    case 'small-cluster':
      return [
        { bias: 'small', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.28, oy: 0.18 },
        { bias: 'small', ox: -0.22, oy: 0.24 },
        { bias: 'medium', ox: 0.14, oy: -0.2 },
        { bias: 'small', ox: 0.42, oy: 0.08 },
      ]
    default:
      return [
        { bias: 'mixed', ox: 0, oy: 0 },
        { bias: 'small', ox: 0.3, oy: 0.16 },
        { bias: 'medium', ox: -0.2, oy: 0.26 },
        { bias: 'large', ox: 0.44, oy: -0.12 },
      ]
  }
}

function spreadForDensity(density) {
  if (density === 'dense') return GRID_STEP * 0.46
  if (density === 'wide') return GRID_STEP * 0.78
  if (density === 'sparse') return GRID_STEP * 0.68
  return GRID_STEP * 0.56
}

function clusterAnchorJitter(zone, seed) {
  return {
    x: Math.round((hash(seed + 101) - 0.5) * GRID_STEP * 1.4),
    y: Math.round((hash(seed + 107) - 0.5) * GRID_STEP * 1.1),
  }
}

function nudgeAwayFromLetters(x, y, size, letterTiles, letterCenterX, letterCenterY) {
  let cx = x
  let cy = y

  for (let attempt = 0; attempt < 14; attempt += 1) {
    const candidate = { x: cx, y: cy, size }
    if (!overlapsLetters(candidate, letterTiles)) {
      return { x: cx, y: cy }
    }

    const dx = cx - letterCenterX
    const dy = cy - letterCenterY
    const length = Math.hypot(dx, dy) || 1
    cx += (dx / length) * GRID_STEP * 0.28
    cy += (dy / length) * GRID_STEP * 0.28
  }

  return { x: cx, y: cy }
}

function placeMandatoryFrame(
  tiles,
  debrisTiles,
  letterTiles,
  bounds,
  { id, centerX, centerY, spread, spec, seed },
) {
  const size = pickFieldTileSize(seed, spec.bias)
  const micro = microOffset(seed)
  const baseX = centerX + spec.ox * spread + micro.x
  const baseY = centerY + spec.oy * spread + micro.y

  const offsets = [
    [0, 0],
    [6, 0],
    [-6, 0],
    [0, 6],
    [0, -6],
    [9, 9],
    [-9, 9],
    [12, -8],
    [-12, -8],
    [16, 4],
    [-16, 4],
    [0, 14],
    [0, -14],
    [18, -12],
    [-18, 12],
  ]

  for (const [dx, dy] of offsets) {
    const x = baseX + dx
    const y = baseY + dy
    if (
      tryPlaceDebrisAt(tiles, debrisTiles, letterTiles, {
        id,
        x,
        y,
        size,
        allowDebrisOverlap: false,
      })
    ) {
      return true
    }
  }

  const nudged = nudgeAwayFromLetters(
    baseX,
    baseY,
    size,
    letterTiles,
    bounds.letterCenterX,
    bounds.letterCenterY,
  )

  tryPlaceDebrisAt(tiles, debrisTiles, letterTiles, {
    id,
    x: nudged.x,
    y: nudged.y,
    size,
    allowDebrisOverlap: false,
  })

  return true
}

function addArchiveFieldClusters(tiles, bounds, zones, idPrefix) {
  const { minX, minY, letterWidth, letterHeight } = bounds
  const debrisTiles = tiles.filter((tile) => tile.kind === 'debris')
  const letterTiles = bounds.letterTiles

  zones.forEach((zone) => {
    const groupSeed = Math.imul(zone.id.length + idPrefix.length + 1200, 811)
    const anchorJitter = clusterAnchorJitter(zone, groupSeed)
    const centerX = minX + zone.nx * letterWidth + anchorJitter.x
    const centerY = minY + zone.ny * letterHeight + anchorJitter.y
    const spread = spreadForDensity(zone.density)
    const specs = constellationSpec(zone.profile)

    specs.forEach((spec, specIndex) => {
      const seed = groupSeed ^ Math.imul(specIndex + 17, 677)
      placeMandatoryFrame(tiles, debrisTiles, letterTiles, bounds, {
        id: `${idPrefix}-${zone.id}-${specIndex}`,
        centerX,
        centerY,
        spread,
        spec,
        seed,
      })
    })
  })
}

function addMandatoryArchiveField(tiles, bounds) {
  addArchiveFieldClusters(tiles, bounds, MANDATORY_FIELD_ZONES, 'field')
}

function addDriftingArchiveField(tiles, bounds) {
  addArchiveFieldClusters(tiles, bounds, DRIFTING_ARCHIVE_CLUSTERS, 'drift')
}

function centerComposition(tiles, letterBounds) {
  const { letterCenterX, letterCenterY, letterWidth, letterHeight, letterTiles } =
    letterBounds

  const padX = GRID_STEP * 6
  const padY = GRID_STEP * 5
  let halfWidth = letterWidth / 2 + padX
  let halfHeight = letterHeight / 2 + padY

  letterTiles.forEach((tile) => {
    const depth = getTileDepth(tile.size)
    halfWidth = Math.max(
      halfWidth,
      letterCenterX - tile.x,
      tile.x + tile.size + depth - letterCenterX,
    )
    halfHeight = Math.max(
      halfHeight,
      letterCenterY - tile.y,
      tile.y + tile.size + depth - letterCenterY,
    )
  })

  tiles.forEach((tile) => {
    if (tile.kind !== 'debris') return
    halfWidth = Math.max(halfWidth, letterCenterX - tile.x, tile.x + tile.size - letterCenterX)
    halfHeight = Math.max(halfHeight, letterCenterY - tile.y, tile.y + tile.size - letterCenterY)
  })

  const width = halfWidth * 2
  const height = halfHeight * 2
  const shiftX = halfWidth - letterCenterX
  const shiftY = halfHeight - letterCenterY

  const centeredTiles = tiles.map((tile) => ({
    ...tile,
    x: tile.x + shiftX,
    y: tile.y + shiftY,
  }))

  return {
    tiles: centeredTiles,
    width,
    height,
    letterWidth,
    letterHeight,
  }
}

export function getWordmark(word = 'KULA') {
  const tiles = []
  let offsetCol = 0

  for (const letter of word) {
    const shape = getLetterShape(letter)
    if (!shape) continue

    addLetterTiles(tiles, shape, offsetCol, letter)
    offsetCol += shape[0].length + LETTER_GAP
  }

  const letterBounds = getLetterBounds(tiles)
  addMandatoryArchiveField(tiles, letterBounds)
  addDriftingArchiveField(tiles, letterBounds)

  return centerComposition(tiles, letterBounds)
}
