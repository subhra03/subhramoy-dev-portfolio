import { useCallback, useMemo, useState } from "react";
import { projectFilters, projects } from "../data/projects";
import { githubProfileLink } from "../utils/links";

const codeSignals = [
  { value: "React", label: "Component UI" },
  { value: "Vite", label: "Fast builds" },
  { value: "GSAP", label: "Motion layer" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [activeFilter]);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];
  const textureProjects = filteredProjects.slice(0, 6);

  const handleSelectFilter = useCallback((nextFilter) => {
    setActiveFilter(nextFilter);
    setActiveIndex(0);

    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("portfolio:layout-change"));
    });
  }, []);

  return (
    <section id="projects" className="section-block projects-section">
      <div className="container">
        <div className="projects-intro">
          <div className="projects-head" data-animate="fade-up">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title" data-scramble>
              A project workbench for the interfaces I build
            </h2>
            <p className="section-subtitle">
              Browse focused web builds with clearer previews, direct live
              links, and a compact view of the code habits behind the work.
            </p>
          </div>

          <div
            className="projects-toolbar"
            data-animate="fade-up"
            aria-label="Project controls"
          >
            <p className="projects-summary">
              <span data-project-count>{filteredProjects.length}</span>
              visible projects
            </p>
            <div className="filter-group" aria-label="Filter projects">
              {projectFilters.map((filter) => {
                const isActive = activeFilter === filter.value;

                return (
                  <button
                    className={`filter-chip${isActive ? " is-active" : ""}`}
                    type="button"
                    data-filter={filter.value}
                    aria-pressed={isActive}
                    onClick={() => handleSelectFilter(filter.value)}
                    key={filter.value}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {activeProject ? (
          <div
            className="project-atlas"
            data-animate="fade-up"
            aria-label="Interactive project atlas"
          >
            <div className="project-atlas-texture" aria-hidden="true">
              {textureProjects.map((project, index) => (
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ "--preview-index": index }}
                  key={project.id}
                />
              ))}
            </div>

            <div className="project-atlas-stage">
              <span className="project-atlas-number" aria-hidden="true">
                {activeProject.index}
              </span>

              <figure className="project-device">
                <figcaption className="project-device-bar">
                  <span>Live preview</span>
                  <span>{activeProject.categoryLabel}</span>
                </figcaption>
                <img
                  src={activeProject.image}
                  alt={activeProject.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <aside className="project-casefile">
              <span className="project-meta">
                Case file {activeProject.index}
              </span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.copy}</p>

              <div
                className="project-tags"
                aria-label={`${activeProject.title} tools`}
              >
                {activeProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="project-signal-strip" aria-label="Build signals">
                {codeSignals.map((signal) => (
                  <span key={signal.value}>
                    <strong>{signal.value}</strong>
                    {signal.label}
                  </span>
                ))}
              </div>

              <div className="project-actions project-case-actions">
                <a
                  href={activeProject.link}
                  className="project-link project-link--primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live
                  <i
                    className="fas fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  href={activeProject.githubLink || githubProfileLink}
                  className="project-link project-link--secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <i className="fab fa-github" aria-hidden="true"></i>
                </a>
              </div>
            </aside>

            <div className="project-radar" aria-label="Choose project">
              {filteredProjects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    className={`project-radar-item${isActive ? " is-active" : ""}`}
                    type="button"
                    aria-label={`Show ${project.title}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                    key={project.id}
                  >
                    <span className="project-radar-thumb" aria-hidden="true">
                      <img
                        src={project.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="project-radar-copy">
                      <strong>{project.index}</strong>
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
