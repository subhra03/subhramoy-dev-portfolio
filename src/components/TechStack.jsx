import { techStack } from "../data/techStack";

export default function TechStack() {
  return (
    <section id="techstack" className="section-block">
      <div className="container">
        <div className="section-head" data-animate="fade-up">
          <p className="section-kicker">Tooling and foundations</p>
          <h2 className="section-title" data-scramble>
            A practical stack for polished web interfaces
          </h2>
          <p className="section-subtitle">
            I keep the stack focused: semantic foundations, strong styling
            discipline, component thinking, and everyday tooling that supports
            reliable front-end delivery.
          </p>
        </div>

        <div className="stack-layout">
          <div className="stack-summary" data-animate="fade-up">
            <span className="stack-summary-label">Working style</span>
            <p>
              Build the layout first, refine the visual rhythm, add interaction
              where it improves comprehension, then check the experience on real
              breakpoints.
            </p>
          </div>

          <div className="row g-3 g-lg-4" data-stagger>
            {techStack.map((item, index) => (
              <div
                className="col-6 col-md-4 col-xl-3"
                data-stagger-item
                key={item.name}
              >
                <article className="tech-card">
                  <span className="tech-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <i className={item.iconClass} aria-hidden="true"></i>
                  )}
                  <h3 className="tech-name">{item.name}</h3>
                  <p className="tech-copy">{item.copy}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
