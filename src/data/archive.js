/**
 * Placeholder archive data.
 * Replace fetch layer with Are.na API integration without changing UI components.
 */

/** @typedef {'upcoming' | 'past'} GatheringStatus */

/**
 * @typedef {Object} ArchiveWorkshop
 * @property {string} id
 * @property {string} title
 * @property {string} date
 * @property {string} location
 * @property {string[]} participants
 * @property {string} description
 * @property {string[]} images
 * @property {string[]} relatedFieldNotes
 * @property {GatheringStatus} gathering
 * @property {{ align: 'start' | 'center' | 'end', offset: number, span: number }} layout
 */

/** @type {ArchiveWorkshop[]} */
export const ARCHIVE_WORKSHOPS = []

export function getArchiveWorkshops() {
  return ARCHIVE_WORKSHOPS
}

export function getWorkshopById(id) {
  return ARCHIVE_WORKSHOPS.find((workshop) => workshop.id === id) ?? null
}

export function getWorkshopsByGathering(status) {
  return ARCHIVE_WORKSHOPS.filter((workshop) => workshop.gathering === status)
}
