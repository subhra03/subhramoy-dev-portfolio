import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import ProjectCard from "./ProjectCard";
import { projectFilters, projects } from "../data/projects";

const getWrappedOffset = (index, activeIndex, total) => {
  const half = Math.floor(total / 2);
  return ((index - activeIndex + half + total) % total) - half;
};

export default function Projects() {
  const sliderRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderRevision, setSliderRevision] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [activeFilter]);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  const goToProject = useCallback(
    (nextIndex) => {
      const total = filteredProjects.length;

      if (total === 0) {
        return;
      }

      setActiveIndex(((nextIndex % total) + total) % total);
    },
    [filteredProjects.length],
  );

  const goPrevious = useCallback(() => {
    goToProject(activeIndex - 1);
  }, [activeIndex, goToProject]);

  const goNext = useCallback(() => {
    goToProject(activeIndex + 1);
  }, [activeIndex, goToProject]);

  const handleSelectProject = useCallback(
    (projectIndex) => {
      goToProject(projectIndex);
    },
    [goToProject],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("portfolio:layout-change"));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [filteredProjects.length]);

  useLayoutEffect(() => {
    const slider = sliderRef.current;

    if (!slider || filteredProjects.length === 0) {
      return undefined;
    }

    const cards = gsap.utils.toArray(
      slider.querySelectorAll(".project-slider-card"),
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const stageWidth = slider.getBoundingClientRect().width;
    const isSmall = stageWidth < 640;
    const isTiny = stageWidth < 430;
    const gap = isTiny
      ? Math.min(stageWidth * 0.28, 92)
      : isSmall
        ? Math.min(stageWidth * 0.42, 150)
        : Math.min(stageWidth * 0.23, 310);
    const farGap = isTiny
      ? Math.min(stageWidth * 0.4, 132)
      : isSmall
        ? Math.min(stageWidth * 0.58, 210)
        : Math.min(stageWidth * 0.38, 520);

    cards.forEach((card, index) => {
      const offset = getWrappedOffset(index, activeIndex, cards.length);
      const absOffset = Math.abs(offset);
      const direction = Math.sign(offset);
      const isCenter = offset === 0;
      const x =
        absOffset === 0
          ? 0
          : direction *
            (absOffset === 1 ? gap : farGap + (absOffset - 2) * gap * 0.42);
      const y =
        absOffset === 0
          ? 0
          : isTiny
            ? 6 + absOffset * 4
            : isSmall
              ? 10 + absOffset * 5
              : 26 + absOffset * 10;
      const scale =
        absOffset === 0
          ? 1
          : absOffset === 1
            ? isSmall
              ? isTiny
                ? 0.48
                : 0.7
              : 0.78
            : absOffset === 2
              ? isSmall
                ? isTiny
                  ? 0.2
                  : 0.38
                : 0.58
              : 0.4;
      const rotation = isCenter
        ? 0
        : direction *
          (isTiny ? 0 : isSmall ? (absOffset === 1 ? -1.4 : -2.5) : absOffset === 1 ? -3 : -6);
      const opacity =
        absOffset === 0
          ? 1
          : absOffset === 1
            ? isTiny
              ? 0.08
              : 0.34
            : absOffset === 2
              ? isTiny
                ? 0
                : 0.08
              : 0;

      const animationProps = {
        x,
        y,
        scale,
        rotation,
        opacity,
        zIndex: 20 - absOffset,
        overwrite: true,
      };

      if (prefersReducedMotion) {
        gsap.set(card, animationProps);
        return;
      }

      gsap.to(card, {
        ...animationProps,
        duration: 0.72,
        ease: "power3.inOut",
      });
    });

    return () => {
      gsap.killTweensOf(cards);
    };
  }, [activeIndex, filteredProjects, sliderRevision]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return undefined;
    }

    let resizeFrame = 0;

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        setSliderRevision((revision) => revision + 1);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSliderKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section id="projects" className="section-block projects-section">
      <div className="container">
        <div className="projects-intro">
          <div className="projects-head" data-animate="fade-up">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title" data-scramble>
              Project interfaces shaped around clarity and visual polish
            </h2>
            <p className="section-subtitle">
              A curated set of front-end builds, utility interfaces, and
              component-led layouts with an emphasis on responsive detail.
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
                    onClick={() => setActiveFilter(filter.value)}
                    key={filter.value}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="project-slider-shell"
          data-animate="fade-up"
          aria-label="Infinite project card slider"
        >
          <div className="project-slider-topline">
            <span className="project-meta">Infinite card slider</span>
            <span className="project-slider-counter">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>

          <div
            className="project-slider-stage"
            aria-live="polite"
            tabIndex="0"
            ref={sliderRef}
            onKeyDown={handleSliderKeyDown}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                project={project}
                isActive={index === activeIndex}
                index={index}
                onSelectProject={handleSelectProject}
                key={project.id}
              />
            ))}
          </div>

          <div className="project-slider-controls" aria-label="Slider controls">
            <button className="slider-nav-button" type="button" onClick={goPrevious}>
              <i className="fas fa-arrow-left" aria-hidden="true"></i>
              Prev
            </button>
            <div className="project-slider-status">
              <strong>{activeProject?.title}</strong>
              <span>{activeProject?.categoryLabel}</span>
            </div>
            <button className="slider-nav-button" type="button" onClick={goNext}>
              Next
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
