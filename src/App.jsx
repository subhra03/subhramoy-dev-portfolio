import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import CurveSwipe from "./components/CurveSwipe";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import { sectionIds } from "./data/navigation";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const smoothEasing = (time) => Math.min(1, 1.001 - 2 ** (-10 * time));
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const smallViewportQuery = "(max-width: 767.98px)";
const finePointerQuery = "(hover: hover) and (pointer: fine)";
const scrollProgressThreshold = 0.002;
const scrambleGlyphs = "01{}[]<>/#";
const sectionColorThemes = {
  home: {
    "--page-bg-start": "#f1f6f3",
    "--page-bg-mid": "#ffffff",
    "--page-bg-end": "#e8f1ed",
    "--backdrop-grid-line": "rgba(17, 20, 20, 0.034)",
    "--backdrop-wash": "rgba(15, 111, 92, 0.045)",
  },
  techstack: {
    "--page-bg-start": "#edf5f1",
    "--page-bg-mid": "#f9fbfa",
    "--page-bg-end": "#e5eee9",
    "--backdrop-grid-line": "rgba(15, 111, 92, 0.045)",
    "--backdrop-wash": "rgba(106, 174, 207, 0.055)",
  },
  projects: {
    "--page-bg-start": "#f4f8f6",
    "--page-bg-mid": "#ffffff",
    "--page-bg-end": "#e8f6f1",
    "--backdrop-grid-line": "rgba(15, 111, 92, 0.055)",
    "--backdrop-wash": "rgba(143, 214, 199, 0.06)",
  },
  about: {
    "--page-bg-start": "#f8faf8",
    "--page-bg-mid": "#ffffff",
    "--page-bg-end": "#eef1ec",
    "--backdrop-grid-line": "rgba(184, 107, 69, 0.04)",
    "--backdrop-wash": "rgba(184, 107, 69, 0.045)",
  },
  contact: {
    "--page-bg-start": "#edf7f3",
    "--page-bg-mid": "#fbfffd",
    "--page-bg-end": "#e4f1ec",
    "--backdrop-grid-line": "rgba(15, 111, 92, 0.052)",
    "--backdrop-wash": "rgba(15, 111, 92, 0.06)",
  },
  footer: {
    "--page-bg-start": "#e7efeb",
    "--page-bg-mid": "#eef4f1",
    "--page-bg-end": "#dfe8e4",
    "--backdrop-grid-line": "rgba(8, 72, 60, 0.06)",
    "--backdrop-wash": "rgba(8, 72, 60, 0.065)",
  },
};

const normalizeHeadingText = (text) => text.replace(/\s+/g, " ").trim();

const getScrambleGlyph = () =>
  scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)];

export default function App() {
  const lenisRef = useRef(null);
  const curveSwipeRef = useRef(null);
  const [activeSection, setActiveSection] = useState(() =>
    window.location.hash ? window.location.hash.slice(1) : "home",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollStateRef = useRef({
    activeSection,
    isScrolled,
    scrollProgress,
    showBackToTop,
  });
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(reducedMotionQuery).matches;
    const isSmallViewport = window.matchMedia(smallViewportQuery).matches;
    const shouldUseLenis = window.matchMedia(finePointerQuery).matches;

    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduced-motion");
      return () => {
        document.documentElement.classList.remove("reduced-motion");
      };
    }

    const lenis = shouldUseLenis
      ? new Lenis({
          duration: 1.05,
          easing: smoothEasing,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.9,
        })
      : null;
    const splitTitle = new SplitType(".hero-title", {
      types: "lines, words",
      lineClass: "split-line",
      wordClass: "split-word",
    });
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    if (lenis) {
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
    }

    const motionCleanupFns = [];

    const ctx = gsap.context(() => {
      let currentThemeId = "";

      const applySectionColorTheme = (themeId) => {
        const theme = sectionColorThemes[themeId];

        if (!theme || currentThemeId === themeId) {
          return;
        }

        currentThemeId = themeId;
        gsap.to(document.documentElement, {
          ...theme,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      [
        ...sectionIds.map((id) => ({ id, selector: `#${id}` })),
        { id: "footer", selector: "[data-footer-reveal]" },
      ].forEach(({ id, selector }) => {
        const section = document.querySelector(selector);

        if (!section) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => applySectionColorTheme(id),
          onEnterBack: () => applySectionColorTheme(id),
        });
      });

      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.78 },
      });
      const heroCounters = gsap.utils.toArray("[data-count-to]");
      const heroKickerText = document.querySelector("[data-hero-kicker-text]");
      let heroKickerTween;
      let heroKickerRestoreTimer;

      gsap.set(".hero-bg-panel", {
        autoAlpha: 0,
        y: isSmallViewport ? 24 : 48,
        scale: 0.96,
      });
      gsap.set(".hero-kicker, .hero-subtitle, .hero-actions", {
        opacity: 0,
        y: isSmallViewport ? 18 : 28,
      });
      gsap.set(".hero-metrics div", { opacity: 0, y: isSmallViewport ? 14 : 24 });
      gsap.set(".hero-visual", {
        autoAlpha: 0,
        x: 42,
        y: 18,
        scale: 0.96,
      });
      gsap.set("[data-hero-visual-item]", {
        autoAlpha: 0,
        y: 18,
      });
      gsap.set(".hero-title .split-line", {
        overflow: "hidden",
      });
      gsap.set(".split-word", {
        opacity: 0,
        yPercent: 116,
        filter: "blur(10px)",
      });

      const restoreHeroKickerText = () => {
        if (!heroKickerText) {
          return;
        }

        window.clearTimeout(heroKickerRestoreTimer);
        heroKickerText.textContent =
          heroKickerText.dataset.kickerFinal || "Frontend Engineer";
        heroKickerText.classList.remove("is-decoding");
      };

      const playHeroKickerScramble = () => {
        if (!heroKickerText) {
          return;
        }

        const finalText = normalizeHeadingText(
          heroKickerText.dataset.kickerFinal || heroKickerText.textContent || "",
        );
        const characters = [...finalText];
        const state = { progress: 0 };

        if (!finalText) {
          return;
        }

        heroKickerTween?.kill();
        window.clearTimeout(heroKickerRestoreTimer);
        heroKickerText.dataset.kickerFinal = finalText;
        heroKickerText.setAttribute("aria-label", finalText);
        heroKickerText.classList.add("is-decoding");

        const renderKickerFrame = () => {
          const revealCount = Math.floor(state.progress * characters.length);

          heroKickerText.textContent = characters
            .map((character, index) => {
              if (character === " ") {
                return " ";
              }

              if (index < revealCount) {
                return character;
              }

              return state.progress > 0.78 && Math.random() > 0.45
                ? character
                : getScrambleGlyph();
            })
            .join("");
        };

        heroKickerTween = gsap.fromTo(
          state,
          { progress: 0 },
          {
            progress: 1,
            duration: isSmallViewport ? 0.58 : 0.72,
            ease: "power3.out",
            onUpdate: renderKickerFrame,
            onComplete: restoreHeroKickerText,
            onInterrupt: restoreHeroKickerText,
          },
        );

        heroKickerRestoreTimer = window.setTimeout(() => {
          heroKickerTween?.kill();
          restoreHeroKickerText();
        }, 1300);
      };

      heroCounters.forEach((counter) => {
        counter.dataset.counterFinal = counter.textContent || "";
        counter.textContent = `0${counter.dataset.countSuffix || ""}`;
      });

      motionCleanupFns.push(() => {
        window.clearTimeout(heroKickerRestoreTimer);
        heroKickerTween?.kill();
        restoreHeroKickerText();

        heroCounters.forEach((counter) => {
          counter.textContent =
            counter.dataset.counterFinal ||
            `${counter.dataset.countTo || "0"}${counter.dataset.countSuffix || ""}`;
        });
      });

      heroTimeline
        .to(".hero-bg-panel", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.12,
        })
        .to(".hero-kicker", { opacity: 1, y: 0 }, 0.1)
        .call(playHeroKickerScramble, [], 0.16)
        .to(
          ".split-word",
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: isSmallViewport ? 0.76 : 0.95,
            stagger: isSmallViewport ? 0.025 : 0.038,
          },
          0.26,
        )
        .to(".hero-subtitle", { opacity: 1, y: 0 }, 0.52)
        .to(".hero-actions", { opacity: 1, y: 0 }, 0.64)
        .to(
          ".hero-visual",
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          0.46,
        )
        .to(
          "[data-hero-visual-item]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.58,
            stagger: 0.075,
            ease: "power3.out",
          },
          0.66,
        )
        .to(
          ".hero-metrics div",
          { opacity: 1, y: 0, stagger: 0.08 },
          0.78,
        );

      heroCounters.forEach((counter, index) => {
        const targetValue = Number(counter.dataset.countTo || 0);
        const suffix = counter.dataset.countSuffix || "";
        const counterState = { value: 0 };

        heroTimeline.to(
          counterState,
          {
            value: targetValue,
            duration: isSmallViewport ? 0.88 : 1.08,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => {
              counter.textContent = `${Math.round(counterState.value)}${suffix}`;
            },
            onComplete: () => {
              counter.textContent = `${targetValue}${suffix}`;
            },
          },
          0.84 + index * 0.04,
        );
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: isSmallViewport ? "bottom 64%" : "bottom 48%",
            scrub: 0.65,
          },
        })
        .to(
          ".hero-copy",
          {
            y: isSmallViewport ? -26 : -78,
            autoAlpha: isSmallViewport ? 0.2 : 0.08,
            scale: isSmallViewport ? 0.985 : 0.96,
            transformOrigin: "left top",
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-visual",
          {
            y: isSmallViewport ? -18 : -56,
            autoAlpha: isSmallViewport ? 0.16 : 0.04,
            scale: isSmallViewport ? 0.985 : 0.95,
            transformOrigin: "center top",
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-title",
          {
            yPercent: isSmallViewport ? -6 : -12,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-scroll-hint",
          {
            autoAlpha: 0,
            y: -12,
            ease: "none",
          },
          0,
        );

      [
        { selector: ".hero-bg-panel--one", yPercent: isSmallViewport ? -5 : -14 },
        { selector: ".hero-bg-panel--two", yPercent: isSmallViewport ? -4 : -9 },
        { selector: ".hero-bg-panel--three", yPercent: isSmallViewport ? -3 : -6 },
      ].forEach(({ selector, yPercent }) => {
        gsap.to(selector, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        });
      });

      const hero = document.querySelector("#home");
      const heroPanels = gsap.utils.toArray(".hero-bg-panel");
      const heroParallaxQuery = window.matchMedia(finePointerQuery);

      if (hero && heroPanels.length > 0 && heroParallaxQuery.matches) {
        const parallaxSettings = [
          { x: 22, rotate: 0.7 },
          { x: -16, rotate: -0.5 },
          { x: 12, rotate: 0.38 },
        ];
        const panelSetters = heroPanels.map((panel, index) => {
          const setting = parallaxSettings[index] || parallaxSettings[0];

          return {
            panel,
            setting,
            xTo: gsap.quickTo(panel, "x", {
              duration: 0.78,
              ease: "power3.out",
            }),
            rotateTo: gsap.quickTo(panel, "rotation", {
              duration: 0.9,
              ease: "power3.out",
            }),
          };
        });
        let heroBounds = hero.getBoundingClientRect();

        const updateHeroBounds = () => {
          heroBounds = hero.getBoundingClientRect();
        };

        const resetHeroParallax = () => {
          panelSetters.forEach(({ xTo, rotateTo }) => {
            xTo(0);
            rotateTo(0);
          });
        };

        const moveHeroParallax = (event) => {
          const progressX =
            ((event.clientX - heroBounds.left) / Math.max(heroBounds.width, 1) -
              0.5) *
            2;

          panelSetters.forEach(({ setting, xTo, rotateTo }) => {
            xTo(progressX * setting.x);
            rotateTo(progressX * setting.rotate);
          });
        };

        hero.classList.add("hero-has-parallax");
        hero.addEventListener("pointerenter", updateHeroBounds);
        hero.addEventListener("pointermove", moveHeroParallax);
        hero.addEventListener("pointerleave", resetHeroParallax);
        window.addEventListener("resize", updateHeroBounds);
        window.addEventListener("blur", resetHeroParallax);

        motionCleanupFns.push(() => {
          hero.classList.remove("hero-has-parallax");
          hero.removeEventListener("pointerenter", updateHeroBounds);
          hero.removeEventListener("pointermove", moveHeroParallax);
          hero.removeEventListener("pointerleave", resetHeroParallax);
          window.removeEventListener("resize", updateHeroBounds);
          window.removeEventListener("blur", resetHeroParallax);
          gsap.killTweensOf(heroPanels);
          gsap.set(heroPanels, { clearProps: "x,rotation" });
        });
      }

      gsap.utils.toArray("[data-animate='fade-up']").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: isSmallViewport ? 24 : 44 },
          {
            opacity: 1,
            y: 0,
            duration: isSmallViewport ? 0.62 : 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 108%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-stagger]").forEach((container) => {
        const items = gsap.utils.toArray(
          container.querySelectorAll("[data-stagger-item]"),
        );

        if (items.length === 0) {
          return;
        }

        gsap.fromTo(
          items,
          { opacity: 0, y: isSmallViewport ? 20 : 34 },
          {
            opacity: 1,
            y: 0,
            duration: isSmallViewport ? 0.56 : 0.72,
            ease: "power3.out",
            stagger: isSmallViewport ? 0.04 : 0.065,
            scrollTrigger: {
              trigger: container,
              start: "top 104%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-scramble]").forEach((heading) => {
        const finalText = normalizeHeadingText(
          heading.dataset.scrambleOriginal ||
            heading.getAttribute("aria-label") ||
            heading.textContent ||
            "",
        );
        const characters = [...finalText];
        const state = { progress: 0 };
        let hasPlayed = false;
        let scrambleTween;
        let restoreTimer;

        if (!finalText) {
          return;
        }

        const restoreHeading = () => {
          window.clearTimeout(restoreTimer);
          heading.textContent = finalText;
          heading.classList.remove("is-scrambling");
          state.progress = 1;
        };

        const renderScrambleFrame = () => {
          const revealCount = Math.floor(state.progress * characters.length);

          heading.textContent = characters
            .map((character, index) => {
              if (character === " ") {
                return " ";
              }

              if (index < revealCount) {
                return character;
              }

              if (state.progress > 0.82 && Math.random() > 0.48) {
                return character;
              }

              return getScrambleGlyph();
            })
            .join("");
        };

        heading.dataset.scrambleOriginal = finalText;
        heading.setAttribute("aria-label", finalText);
        heading.textContent = finalText;

        ScrollTrigger.create({
          trigger: heading,
          start: "top 92%",
          once: true,
          onEnter: () => {
            if (hasPlayed) {
              restoreHeading();
              return;
            }

            hasPlayed = true;
            scrambleTween?.kill();
            window.clearTimeout(restoreTimer);

            scrambleTween = gsap.fromTo(
              state,
              { progress: 0 },
              {
                progress: 1,
                duration: 1.05,
                ease: "power3.out",
                onStart: () => {
                  heading.classList.add("is-scrambling");
                  restoreTimer = window.setTimeout(() => {
                    scrambleTween?.kill();
                    restoreHeading();
                  }, 1800);
                },
                onUpdate: renderScrambleFrame,
                onComplete: restoreHeading,
                onInterrupt: restoreHeading,
              },
            );
          },
        });

        motionCleanupFns.push(() => {
          window.clearTimeout(restoreTimer);
          scrambleTween?.kill();
          restoreHeading();
        });
      });

      const footer = document.querySelector("[data-footer-reveal]");

      if (footer) {
        const footerShell = footer.querySelector(".footer-shell");
        const footerItems = gsap.utils.toArray(
          footer.querySelectorAll("[data-footer-item]"),
        );
        const footerSocialLinks = gsap.utils.toArray(
          footer.querySelectorAll("[data-footer-social]"),
        );

        gsap.set(footerShell, {
          autoAlpha: 0,
          y: isSmallViewport ? 42 : 72,
          ...(isSmallViewport
            ? {}
            : { clipPath: "inset(100% 0% 0% 0% round 8px)" }),
        });
        gsap.set(footerItems, { autoAlpha: 0, y: isSmallViewport ? 16 : 24 });
        gsap.set(footerSocialLinks, {
          autoAlpha: 0,
          y: isSmallViewport ? 18 : 26,
          scale: 0.86,
          rotation: -8,
        });

        const footerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 84%",
            once: true,
          },
        });

        footerTimeline
          .to(footerShell, {
            autoAlpha: 1,
            y: 0,
            ...(isSmallViewport
              ? {}
              : { clipPath: "inset(0% 0% 0% 0% round 8px)" }),
            duration: isSmallViewport ? 0.68 : 0.95,
            ease: "expo.out",
          })
          .to(
            footerItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              ease: "power3.out",
              stagger: 0.07,
            },
            "-=0.52",
          )
          .to(
            footerSocialLinks,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.62,
              ease: "back.out(1.8)",
              stagger: 0.075,
            },
            "-=0.48",
          );
      }

      const pointerQuery = window.matchMedia(finePointerQuery);

      if (pointerQuery.matches) {
        const heroCtaButtons = gsap.utils.toArray(".hero-actions .btn");

        heroCtaButtons.forEach((button) => {
          const icon = button.querySelector("i");

          gsap.set(button, { "--hero-cta-shine": 0 });

          const animateCtaIn = () => {
            gsap.to(button, {
              "--hero-cta-shine": 1,
              scale: 1.018,
              duration: 0.34,
              ease: "power3.out",
            });

            if (icon) {
              gsap.to(icon, {
                x: 5,
                rotate: -8,
                duration: 0.32,
                ease: "back.out(2)",
              });
            }
          };

          const animateCtaOut = () => {
            gsap.to(button, {
              "--hero-cta-shine": 0,
              scale: 1,
              duration: 0.38,
              ease: "power3.out",
            });

            if (icon) {
              gsap.to(icon, {
                x: 0,
                rotate: 0,
                duration: 0.3,
                ease: "power3.out",
              });
            }
          };

          button.classList.add("hero-cta-polished");
          button.addEventListener("pointerenter", animateCtaIn);
          button.addEventListener("pointerleave", animateCtaOut);
          button.addEventListener("focus", animateCtaIn);
          button.addEventListener("blur", animateCtaOut);

          motionCleanupFns.push(() => {
            button.classList.remove("hero-cta-polished");
            button.removeEventListener("pointerenter", animateCtaIn);
            button.removeEventListener("pointerleave", animateCtaOut);
            button.removeEventListener("focus", animateCtaIn);
            button.removeEventListener("blur", animateCtaOut);
            gsap.killTweensOf([button, icon].filter(Boolean));
            gsap.set([button, icon].filter(Boolean), {
              clearProps: "scale,x,rotate,--hero-cta-shine",
            });
          });
        });

        const magneticSelector = [
          ".btn",
          ".filter-chip",
          ".action-chip",
          ".about-social-link",
          ".slider-nav-button",
          ".project-link",
          ".footer-nav-link",
          ".footer-social-link",
        ].join(", ");
        const magneticItems = gsap.utils.toArray(magneticSelector).filter(
          (item) => !item.closest(".navbar"),
        );

        magneticItems.forEach((item) => {
          const icon = item.querySelector("i, .social-glyph");
          const strength = item.classList.contains("filter-chip") ? 0.16 : 0.22;
          const moveX = gsap.quickTo(item, "x", {
            duration: 0.34,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(item, "y", {
            duration: 0.34,
            ease: "power3.out",
          });
          const iconX = icon
            ? gsap.quickTo(icon, "x", { duration: 0.32, ease: "power3.out" })
            : null;
          const iconY = icon
            ? gsap.quickTo(icon, "y", { duration: 0.32, ease: "power3.out" })
            : null;

          const resetMagneticPosition = () => {
            moveX(0);
            moveY(0);
            iconX?.(0);
            iconY?.(0);
          };

          const moveMagneticItem = (event) => {
            if (
              item.matches(":disabled") ||
              item.getAttribute("aria-disabled") === "true"
            ) {
              resetMagneticPosition();
              return;
            }

            const bounds = item.getBoundingClientRect();
            const offsetX = event.clientX - bounds.left - bounds.width / 2;
            const offsetY = event.clientY - bounds.top - bounds.height / 2;
            const x = offsetX * strength;
            const y = offsetY * strength - 2;

            moveX(x);
            moveY(y);
            iconX?.(x * 0.28);
            iconY?.(y * 0.28);
          };

          item.classList.add("is-magnetic");
          item.addEventListener("pointermove", moveMagneticItem);
          item.addEventListener("pointerleave", resetMagneticPosition);
          item.addEventListener("blur", resetMagneticPosition);

          motionCleanupFns.push(() => {
            item.classList.remove("is-magnetic");
            item.removeEventListener("pointermove", moveMagneticItem);
            item.removeEventListener("pointerleave", resetMagneticPosition);
            item.removeEventListener("blur", resetMagneticPosition);
            gsap.killTweensOf([item, icon].filter(Boolean));
            gsap.set([item, icon].filter(Boolean), { clearProps: "x,y" });
          });
        });
      }
    });

    let refreshFrame = 0;

    const refreshScrollTriggers = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener("portfolio:layout-change", refreshScrollTriggers);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("portfolio:layout-change", refreshScrollTriggers);
      window.cancelAnimationFrame(refreshFrame);
      motionCleanupFns.forEach((cleanup) => cleanup());
      ctx.revert();
      splitTitle.revert();
      if (lenis) {
        lenis.off?.("scroll", ScrollTrigger.update);
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      }
      lenisRef.current = null;
    };
  }, []);

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

  useEffect(() => {
    document.body.classList.toggle("nav-open", isMenuOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeExpandedMenu = () => {
      if (window.innerWidth > 991.98) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeExpandedMenu);

    return () => {
      window.removeEventListener("resize", closeExpandedMenu);
    };
  }, []);

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

      const prefersReducedMotion = window.matchMedia(reducedMotionQuery).matches;

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
  }, []);

  const handleBackToTop = () => {
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
  };

  return (
    <>
      <div className="site-backdrop" aria-hidden="true">
        <span className="backdrop-grid"></span>
      </div>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="scroll-progress" aria-hidden="true">
        <span
          className="scroll-progress-bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        ></span>
      </div>

      <Navbar
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        isScrolled={isScrolled}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      <main id="main-content">
        <Hero />
        <TechStack />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer year={year} />
      <CurveSwipe ref={curveSwipeRef} />
      <BackToTop isVisible={showBackToTop} onClick={handleBackToTop} />
    </>
  );
}
