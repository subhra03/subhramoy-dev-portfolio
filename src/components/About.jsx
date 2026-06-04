import resumePdf from "../../asset/cv.pdf";
import aboutImage from "../../asset/my.jpeg";

const principles = [
  {
    title: "UI systems",
    copy: "Consistent components, spacing, and reusable styling patterns.",
  },
  {
    title: "Motion discipline",
    copy: "Animation that supports comprehension and keeps the interface steady.",
  },
  {
    title: "Performance mindset",
    copy: "Visual polish delivered without unnecessary page weight or friction.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-block">
      <div className="container">
        <div className="about-shell">
          <div className="about-media" data-animate="fade-up">
            <figure className="about-card">
              <img
                src={aboutImage}
                alt="Subhramoy Bhowmik"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <div className="about-content" data-animate="fade-up">
            <div className="about-panel">
              <p className="section-kicker">About / engineering point of view</p>
              <h2 className="section-title" data-scramble>
                I care about interfaces that look intentional and behave
                reliably
              </h2>
              <p className="section-subtitle">
                My work sits at the intersection of visual taste, responsive
                layout, and practical implementation.
              </p>

              <p>
                I build front-end work with a simple standard: the interface
                should be easy to scan, pleasant to use, and clear enough for
                another developer to maintain.
              </p>
              <p>
                With HTML, CSS, JavaScript, Bootstrap, and React, I like taking
                a rough idea and shaping it into a polished web experience that
                feels calm, responsive, and purposeful.
              </p>

              <div className="principles-grid" aria-label="Working principles">
                {principles.map((principle) => (
                  <article className="principle-card" key={principle.title}>
                    <h3 className="principle-label">{principle.title}</h3>
                    <p>{principle.copy}</p>
                  </article>
                ))}
              </div>

              <div className="about-actions">
                <a
                  href={resumePdf}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resume
                  <i className="fas fa-file-lines" aria-hidden="true"></i>
                </a>
                <a href="#contact" className="btn btn-outline-primary">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
