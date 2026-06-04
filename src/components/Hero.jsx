export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-bg-panel hero-bg-panel--one"></span>
        <span className="hero-bg-panel hero-bg-panel--two"></span>
        <span className="hero-bg-panel hero-bg-panel--three"></span>
      </div>

      <div className="container">
        <div className="hero-shell">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span></span>
              Frontend Engineer
            </p>

            <h1 className="hero-title" aria-label="Subhramoy Bhowmik">
              Subhramoy Bhowmik
            </h1>

            <p className="hero-subtitle">
              I craft polished, responsive web interfaces with elegant visuals,
              clean structure, and production-minded front-end implementation.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary btn-lg">
                Explore Work
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
              <a href="#contact" className="btn btn-outline-primary btn-lg">
                Start a Conversation
              </a>
            </div>

            <div className="hero-metrics" aria-label="Portfolio highlights">
              <div>
                <strong data-count-to="8">8</strong>
                <span>Selected builds</span>
              </div>
              <div>
                <strong data-count-to="5" data-count-suffix="+">5+</strong>
                <span>Core tools</span>
              </div>
              <div>
                <strong data-count-to="48" data-count-suffix="h">48h</strong>
                <span>Reply window</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        className="hero-scroll-hint"
        href="#techstack"
        aria-label="Scroll to tech stack"
      >
        <span>Scroll</span>
        <i className="fas fa-arrow-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
