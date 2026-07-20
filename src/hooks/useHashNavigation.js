import { useCallback, useEffect } from "react";
import { reducedMotionQuery, smoothEasing } from "../utils/motion";

export function useHashNavigation({
  curveSwipeRef,
  lenisRef,
  scrollStateRef,
  setActiveSection,
  setIsMenuOpen,
}) {
  useEffect(() => {
    const handleHashLinkClick = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest("a[href^='#']");

      if (!link) {
        return;
      }

      if (link.classList.contains("skip-link")) {
        return;
      }

      const hash = link.getAttribute("href");

      if (!hash || hash === "#") {
        return;
      }

      const target = document.querySelector(hash);

      if (!target) {
        return;
      }

      event.preventDefault();
      setIsMenuOpen(false);

      const prefersReducedMotion =
        window.matchMedia(reducedMotionQuery).matches;

      const scrollToSection = (isImmediate = false) => {
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }

        const nextSection = hash.slice(1);

        scrollStateRef.current.activeSection = nextSection;
        setActiveSection(nextSection);

        if (lenisRef.current && !prefersReducedMotion) {
          lenisRef.current.scrollTo(target, {
            duration: isImmediate ? undefined : 1.05,
            easing: smoothEasing,
            immediate: isImmediate,
            force: isImmediate,
          });
          return;
        }

        target.scrollIntoView({
          behavior: prefersReducedMotion || isImmediate ? "auto" : "smooth",
          block: "start",
        });
      };

      if (!prefersReducedMotion && curveSwipeRef.current) {
        curveSwipeRef.current.play({
          onCovered: () => scrollToSection(true),
        });
        return;
      }

      scrollToSection(false);
    };

    document.addEventListener("click", handleHashLinkClick);

    return () => {
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, [
    curveSwipeRef,
    lenisRef,
    scrollStateRef,
    setActiveSection,
    setIsMenuOpen,
  ]);

  return useCallback(() => {
    const prefersReducedMotion = window.matchMedia(reducedMotionQuery).matches;

    const scrollToTop = (isImmediate = false) => {
      if (lenisRef.current && !prefersReducedMotion) {
        lenisRef.current.scrollTo(0, {
          duration: isImmediate ? undefined : 1,
          easing: smoothEasing,
          immediate: isImmediate,
          force: isImmediate,
        });
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion || isImmediate ? "auto" : "smooth",
      });
    };

    if (!prefersReducedMotion && curveSwipeRef.current) {
      curveSwipeRef.current.play({
        onCovered: () => scrollToTop(true),
      });
      return;
    }

    scrollToTop(false);
  }, [curveSwipeRef, lenisRef]);
}
