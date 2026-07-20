import { techStack, techStackGroups } from "../data/techStack";

const stackGroups = techStackGroups.map((group) => ({
  ...group,
  items: techStack.filter((item) => item.group === group.id),
}));

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
            reliable web delivery.
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

          <div className="stack-map" data-stagger>
            {stackGroups.map((group) => (
              <article className="stack-lane" data-stagger-item key={group.id}>
                <header className="stack-lane-head">
                  <span className="stack-lane-index">{group.index}</span>
                  <div>
                    <h3>{group.label}</h3>
                    <p>{group.copy}</p>
                  </div>
                </header>

                <div className="stack-tools">
                  {group.items.map((item) => (
                    <div className="stack-chip" key={item.name}>
                      <span className="stack-chip-icon" aria-hidden="true">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            width="32"
                            height="32"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <i className={item.iconClass}></i>
                        )}
                      </span>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.copy}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
