/** @typedef {Object} FieldNote
 * @property {string} id
 * @property {string} title
 * @property {string} date
 * @property {string} excerpt
 * @property {string[]} references
 */

/** @type {FieldNote[]} */
export const FIELD_NOTES = []

export function getFieldNotes() {
  return FIELD_NOTES
}

export function getFieldNoteById(id) {
  return FIELD_NOTES.find((note) => note.id === id) ?? null
}
