import profileImage from "../../asset/my photo.webp";

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
              <span className="hero-kicker-line"></span>
              <span className="hero-kicker-text" data-hero-kicker-text>
                Software Developer
              </span>
            </p>

            <h1 className="hero-title" aria-label="Subhramoy Bhowmik">
              Subhramoy Bhowmik
            </h1>

            <p className="hero-subtitle">
              I build responsive web experiences with clean UI, practical code,
              and polished interaction details.
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

            <div className="hero-quality-strip" aria-label="Build quality">
              <span>Responsive layouts</span>
              <span>Reusable components</span>
              <span>Accessible markup</span>
              <span>Motion with restraint</span>
            </div>
          </div>

          <aside
            className="hero-visual"
            aria-label="Subhramoy Bhowmik and build focus"
          >
            <figure className="hero-portrait-card" data-hero-visual-item>
              <img
                src={profileImage}
                alt="Subhramoy Bhowmik"
                width="900"
                height="900"
                decoding="async"
              />
              <figcaption>
                <span className="hero-status">
                  <span aria-hidden="true"></span>
                  Available for work
                </span>
                <strong>Software developer focused on refined web UI.</strong>
              </figcaption>
            </figure>

            <div className="hero-side-panel" data-hero-visual-item>
              <div className="hero-build-orbit" aria-label="Build focus">
                <span className="hero-orbit-ring hero-orbit-ring--outer"></span>
                <span className="hero-orbit-ring hero-orbit-ring--inner"></span>

                <div className="hero-orbit-core">
                  <strong>09</strong>
                  <span>Live builds</span>
                </div>

                <span className="hero-orbit-node hero-orbit-node--react">
                  <i className="fab fa-react" aria-hidden="true"></i>
                  React
                </span>
                <span className="hero-orbit-node hero-orbit-node--vite">
                  <i className="fas fa-bolt" aria-hidden="true"></i>
                  Vite
                </span>
                <span className="hero-orbit-node hero-orbit-node--motion">
                  <i
                    className="fas fa-wand-magic-sparkles"
                    aria-hidden="true"
                  ></i>
                  GSAP
                </span>
                <span className="hero-orbit-node hero-orbit-node--ui">
                  <i className="fas fa-layer-group" aria-hidden="true"></i>
                  UI
                </span>
              </div>

              <div className="hero-focus-note">
                <span>Current focus</span>
                <strong>Interfaces that feel clear, fast, and crafted.</strong>
              </div>
            </div>
          </aside>
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
