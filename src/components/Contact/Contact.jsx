import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact section-anchor">
      <div className="contact__inner">
        <h2 className="section-label">Contact</h2>
        <p className="contact__lead">
          Correspondence for hosting proposals, archive contributions and general inquiry.
          <span className="ko">모임 제안, 아카이브 기여, 그 밖의 문의.</span>
        </p>
        <p className="contact__detail">
          <span className="contact__label">Email</span>
          <a className="text-link" href="mailto:kula.archive@gmail.com">kula.archive@gmail.com</a>
        </p>
      </div>
    </section>
  )
}
