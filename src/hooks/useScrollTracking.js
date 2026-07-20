import { useEffect, useRef, useState } from "react";
import { sectionIds } from "../data/navigation";
import { scrollProgressThreshold } from "../utils/motion";

export function useScrollTracking() {
  const [activeSection, setActiveSection] = useState(() =>
    window.location.hash ? window.location.hash.slice(1) : "home",
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollStateRef = useRef({
    activeSection,
    isScrolled,
    scrollProgress,
    showBackToTop,
  });

  useEffect(() => {
    let scrollTicking = false;

    const updateTrackedState = (key, nextValue, setter) => {
      if (scrollStateRef.current[key] === nextValue) {
        return;
      }

      scrollStateRef.current[key] = nextValue;
      setter(nextValue);
    };

    const updateScrollState = () => {
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollRange > 0 ? Math.min(window.scrollY / scrollRange, 1) : 0;
      const anchorY = Math.min(window.innerHeight * 0.38, 440);

      let currentSection = sectionIds[0];
      const panels = sectionIds
        .map((sectionId) => document.getElementById(sectionId))
        .filter(Boolean);

      panels.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= anchorY && rect.bottom > anchorY * 0.35) {
          currentSection = section.id;
        }
      });

      updateTrackedState("isScrolled", window.scrollY > 24, setIsScrolled);
      updateTrackedState(
        "showBackToTop",
        window.scrollY > window.innerHeight * 0.7,
        setShowBackToTop,
      );
      updateTrackedState("activeSection", currentSection, setActiveSection);

      if (
        Math.abs(scrollStateRef.current.scrollProgress - nextProgress) >
          scrollProgressThreshold ||
        nextProgress === 0 ||
        nextProgress === 1
      ) {
        scrollStateRef.current.scrollProgress = nextProgress;
        setScrollProgress(nextProgress);
      }
    };

    const requestScrollRefresh = () => {
      if (scrollTicking) {
        return;
      }

      scrollTicking = true;

      window.requestAnimationFrame(() => {
        scrollTicking = false;
        updateScrollState();
      });
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        const nextSection = window.location.hash.slice(1);

        scrollStateRef.current.activeSection = nextSection;
        setActiveSection(nextSection);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", requestScrollRefresh, { passive: true });
    window.addEventListener("resize", requestScrollRefresh);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", requestScrollRefresh);
      window.removeEventListener("resize", requestScrollRefresh);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return {
    activeSection,
    isScrolled,
    scrollProgress,
    scrollStateRef,
    setActiveSection,
    showBackToTop,
  };
}
