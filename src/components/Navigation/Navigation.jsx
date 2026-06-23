import './Navigation.css'

const NAV_ITEMS = [
  { label: 'Archive', target: 'archive' },
  { label: 'Protocols', target: 'protocols' },
  { label: 'Contact', target: 'contact' },
]

export default function Navigation({ activeSection, onNavigate, onHome }) {
  return (
    <header className="navigation">
      <nav className="navigation__inner" aria-label="Primary">
        <ul className="navigation__list">
          <li className="navigation__item--home">
            <button
              type="button"
              className={`navigation__link navigation__link--home${activeSection === null ? ' is-active' : ''}`}
              onClick={onHome}
            >
              KULA
            </button>
          </li>
          {NAV_ITEMS.map(({ label, target }) => (
            <li key={target}>
              <button
                type="button"
                className={`navigation__link${activeSection === target ? ' is-active' : ''}`}
                onClick={() => onNavigate(target)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
