import { useEffect, useState } from "react";

export function useResponsiveMenuState() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return { isMenuOpen, setIsMenuOpen };
}
