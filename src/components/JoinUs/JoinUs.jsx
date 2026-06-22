import './JoinUs.css'

export default function JoinUs() {
  return (
    <section id="join-us" className="join-us section-anchor">
      <div className="join-us__inner">
        <h2 className="section-label">
          Join Us
          <span className="ko">함께하기</span>
        </h2>
        <p className="join-us__lead">
          The Discord channel is open.
          <span className="ko">디스코드 채널이 열려 있습니다.</span>
        </p>
        <p className="join-us__link-line">
          <a
            className="text-link"
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            Discord link coming soon
          </a>
        </p>
      </div>
    </section>
  )
}
