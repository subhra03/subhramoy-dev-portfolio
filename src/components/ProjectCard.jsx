import { memo } from "react";

function ProjectCard({ project, isActive, index, onSelectProject }) {
  const handleSelect = (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      return;
    }

    onSelectProject(index);
  };

  return (
    <article
      className={`project-card project-slider-card${isActive ? " is-current" : ""}`}
      data-category={project.categories.join(" ")}
      aria-label={`${project.title} project`}
      aria-current={isActive ? "true" : undefined}
      onClick={handleSelect}
    >
      <span className="slider-edge slider-edge--left">{project.index}</span>
      <span className="slider-edge slider-edge--right">{project.categoryLabel}</span>

      <div className="project-body">
        <span className="project-meta">
          {project.index} / {project.categoryLabel}
        </span>

        <div className="project-media">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <span className="project-card-count" aria-hidden="true">
            {project.index}
          </span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-copy">{project.copy}</p>

        <div className="project-tags" aria-label={`${project.title} tools`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <a
          href={project.link}
          className="project-link"
          target="_blank"
          rel="noreferrer"
        >
          Visit Live
          <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </div>
    </article>
  );
}

export default memo(ProjectCard);
