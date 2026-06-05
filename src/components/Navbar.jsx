import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import logoImage from "../../asset/logo-160.png";
import { navItems } from "../data/navigation";

const desktopNavQuery = "(min-width: 992px)";

export default function Navbar({
  activeSection,
  isMenuOpen,
  isScrolled,
  onToggleMenu,
  onCloseMenu,
}) {
  const menuRef = useRef(null);
  const toggleIconRef = useRef(null);
  const linkRefs = useRef([]);
  const hasSyncedMenuRef = useRef(false);

  useLayoutEffect(() => {
    const desktopQuery = window.matchMedia(desktopNavQuery);

    const clearDesktopInlineStyles = () => {
      if (!desktopQuery.matches) {
        return;
      }

      const menu = menuRef.current;
      const links = linkRefs.current.filter(Boolean);
      const toggleIcon = toggleIconRef.current;
      const toggleLines = toggleIcon
        ? gsap.utils.toArray(toggleIcon.querySelectorAll("span"))
        : [];

      gsap.killTweensOf([menu, ...links, ...toggleLines].filter(Boolean));
      gsap.set([menu, ...links, ...toggleLines].filter(Boolean), {
        clearProps: "all",
      });
      hasSyncedMenuRef.current = false;
    };

    clearDesktopInlineStyles();
    desktopQuery.addEventListener("change", clearDesktopInlineStyles);

    return () => {
      desktopQuery.removeEventListener("change", clearDesktopInlineStyles);
    };
  }, []);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const toggleIcon = toggleIconRef.current;
    const links = linkRefs.current.filter(Boolean);

    if (!menu || links.length === 0) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktopQuery = window.matchMedia(desktopNavQuery);
    const toggleLines = toggleIcon
      ? gsap.utils.toArray(toggleIcon.querySelectorAll("span"))
      : [];

    const clearAnimatedStyles = () => {
      gsap.killTweensOf([menu, ...links, ...toggleLines]);
      gsap.set([menu, ...links, ...toggleLines], { clearProps: "all" });
    };

    const setClosed = () => {
      gsap.set(menu, {
        autoAlpha: 0,
        scaleX: 0.995,
        scaleY: 0.96,
        transformOrigin: "top center",
        y: -8,
      });
      gsap.set(links, {
        autoAlpha: 0,
        y: -8,
      });
      gsap.set(toggleLines, {
        opacity: 1,
        rotate: 0,
        scaleX: 1,
        x: 0,
        y: 0,
      });
    };

    const setOpen = () => {
      gsap.set(menu, {
        autoAlpha: 1,
        scaleX: 1,
        scaleY: 1,
        y: 0,
      });
      gsap.set(links, {
        autoAlpha: 1,
        y: 0,
      });
      if (toggleLines.length === 3) {
        gsap.set(toggleLines[0], { rotate: 45, y: 6 });
        gsap.set(toggleLines[1], { opacity: 0, scaleX: 0.15 });
        gsap.set(toggleLines[2], { rotate: -45, y: -6 });
      }
    };

    if (prefersReducedMotion || desktopQuery.matches) {
      clearAnimatedStyles();
      hasSyncedMenuRef.current = false;
      return undefined;
    }

    if (!hasSyncedMenuRef.current) {
      if (isMenuOpen) {
        setOpen();
      } else {
        setClosed();
      }
      hasSyncedMenuRef.current = true;
      return undefined;
    }

    const timeline = gsap.timeline({
      defaults: { overwrite: true },
    });

    gsap.killTweensOf([menu, ...links, ...toggleLines]);

    if (isMenuOpen) {
      gsap.set(menu, {
        autoAlpha: 1,
        scaleX: 0.995,
        scaleY: 0.96,
        transformOrigin: "top center",
        y: -8,
      });
      gsap.set(links, {
        autoAlpha: 0,
        y: -8,
      });

      timeline
        .to(menu, {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          duration: 0.34,
          ease: "expo.out",
        })
        .to(
          links,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
            stagger: 0.045,
          },
          0.08,
        );

      if (toggleLines.length === 3) {
        timeline
          .to(toggleLines[0], { rotate: 45, y: 6, duration: 0.28, ease: "power3.out" }, 0)
          .to(toggleLines[1], { opacity: 0, scaleX: 0.15, duration: 0.2, ease: "power2.out" }, 0)
          .to(toggleLines[2], { rotate: -45, y: -6, duration: 0.28, ease: "power3.out" }, 0);
      }

      return () => timeline.kill();
    }

    gsap.set(menu, {
      autoAlpha: 1,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "top center",
      y: 0,
    });

    timeline
      .to(links, {
        autoAlpha: 0,
        y: -6,
        duration: 0.14,
        ease: "power2.in",
        stagger: { each: 0.025, from: "end" },
      })
      .to(
        menu,
        {
          autoAlpha: 0,
          scaleX: 0.995,
          scaleY: 0.96,
          y: -8,
          duration: 0.26,
          ease: "power3.in",
          onComplete: setClosed,
        },
        0.04,
      );

    if (toggleLines.length === 3) {
      timeline
        .to(toggleLines[0], { rotate: 0, y: 0, duration: 0.24, ease: "power2.inOut" }, 0)
        .to(toggleLines[1], { opacity: 1, scaleX: 1, duration: 0.2, ease: "power2.inOut" }, 0.06)
        .to(toggleLines[2], { rotate: 0, y: 0, duration: 0.24, ease: "power2.inOut" }, 0);
    }

    return () => timeline.kill();
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    const activeLink = linkRefs.current.find(
      (link) => link?.dataset.sectionId === activeSection,
    );

    if (!activeLink) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const label = activeLink.querySelector(".nav-link-label");
    const index = activeLink.querySelector(".nav-link-index");
    const timeline = gsap.timeline({ defaults: { overwrite: true } });

    timeline
      .fromTo(
        activeLink,
        { scale: 0.96 },
        { scale: 1, duration: 0.34, ease: "back.out(2)", clearProps: "scale" },
      )
      .fromTo(
        label,
        { y: 5 },
        { y: 0, duration: 0.28, ease: "power3.out", clearProps: "transform" },
        0,
      )
      .fromTo(
        index,
        { opacity: 0.32, x: 6 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", clearProps: "all" },
        0.03,
      );

    return () => timeline.kill();
  }, [activeSection]);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top orchestrated-navbar${isScrolled ? " scrolled" : ""}`}
      aria-label="Primary"
    >
      <div className="container">
        <div className="nav-shell">
          <a
            href="#home"
            className="navbar-brand"
            aria-label="Go to the home section"
            onClick={onCloseMenu}
          >
            <span className="brand-mark">
              <img
                src={logoImage}
                alt="Subhramoy Bhowmik logo"
                width="160"
                height="160"
                decoding="async"
              />
            </span>
            <span className="brand-copy">
              <span className="brand-title">Subhramoy Bhowmik</span>
              <span className="brand-subtitle">Frontend Engineer</span>
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={onToggleMenu}
          >
            <span
              className="navbar-toggler-icon nav-toggle-icon"
              aria-hidden="true"
              ref={toggleIconRef}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <div
            className={`navbar-collapse orchestrated-menu${isMenuOpen ? " show" : ""}`}
            id="navbarNav"
            ref={menuRef}
          >
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <li className="nav-item" key={item.id}>
                    <a
                      className={`nav-link${isActive ? " active" : ""}`}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onCloseMenu}
                      data-section-id={item.id}
                      aria-label={item.label}
                      ref={(element) => {
                        linkRefs.current[index] = element;
                      }}
                    >
                      <span className="nav-link-label">{item.label}</span>
                      <span className="nav-link-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
