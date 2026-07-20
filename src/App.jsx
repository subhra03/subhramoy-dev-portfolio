import { useRef } from "react";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import CurveSwipe from "./components/CurveSwipe";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import { useHashNavigation } from "./hooks/useHashNavigation";
import { usePageAnimations } from "./hooks/usePageAnimations";
import { useResponsiveMenuState } from "./hooks/useResponsiveMenuState";
import { useScrollTracking } from "./hooks/useScrollTracking";

export default function App() {
  const lenisRef = useRef(null);
  const curveSwipeRef = useRef(null);
  const { isMenuOpen, setIsMenuOpen } = useResponsiveMenuState();
  const {
    activeSection,
    isScrolled,
    scrollProgress,
    scrollStateRef,
    setActiveSection,
    showBackToTop,
  } = useScrollTracking();
  const handleBackToTop = useHashNavigation({
    curveSwipeRef,
    lenisRef,
    scrollStateRef,
    setActiveSection,
    setIsMenuOpen,
  });
  const year = new Date().getFullYear();

  usePageAnimations(lenisRef);

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
