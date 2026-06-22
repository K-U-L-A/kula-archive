import { getProtocols } from '../../data/protocols'
import './Protocols.css'

export default function Protocols() {
  const protocols = getProtocols()

  return (
    <section id="protocols" className="protocols section-anchor">
      <div className="protocols__intro">
        <h2 className="section-label">Protocols</h2>
      </div>

      <div className="protocols__docs">
        {protocols.map((section) => (
          <article key={section.id} id={`protocol-${section.id}`} className="protocol-doc">
            <h3 className="protocol-doc__title">{section.title}</h3>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="protocol-doc__paragraph">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}
