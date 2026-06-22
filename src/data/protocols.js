/** @typedef {Object} ProtocolSection
 * @property {string} id
 * @property {string} title
 * @property {string[]} body
 */

/** @type {ProtocolSection[]} */
export const PROTOCOLS = [
  {
    id: 'hosting',
    title: '01 · Hosting',
    body: [
      'A KULA gathering requires a room, a duration and a method for documentation.',
      'The host does not perform. The host maintains conditions — seating, light, time, consent.',
      'Materials may include objects, texts, tools, food or nothing at all.',
    ],
  },
  {
    id: 'documenting',
    title: '02 · Documenting',
    body: [
      'Documentation is partial by design. Not everything is captured. Not everything should be.',
      'Images, notes, objects and conversation fragments enter the archive with date, location and participants.',
      'Contributors retain the right to withdraw material.',
    ],
  },
  {
    id: 'circulating',
    title: '03 · Circulating',
    body: [
      'Circulation is slow. The archive is not a feed.',
      'Field notes may reference workshops. Workshops may reference field notes. Links are provisional.',
      'Future integrations: Are.na channels, calendar, public index.',
    ],
  },
  {
    id: 'consent',
    title: '04 · Consent',
    body: [
      'Names appear only with agreement. Faces may be omitted. Audio may be transcribed without attribution.',
      'The commons is maintained through care, not exposure.',
    ],
  },
]

export function getProtocols() {
  return PROTOCOLS
}
