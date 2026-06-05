import { navItems } from "../data/navigation";
import { socialLinks } from "../data/socialLinks";

export default function Footer({ year }) {
  return (
    <footer className="site-footer" data-footer-reveal>
      <div className="container">
        <div className="footer-shell">
          <div className="footer-main" data-footer-item>
            <p className="footer-kicker">Frontend portfolio</p>
            <p className="footer-copy">
              Built with intention, shaped for usability, and refined for a
              premium web experience.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navItems.map((link, index) => (
              <a
                className="footer-nav-link"
                href={link.href}
                data-footer-item
                key={link.href}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-connect" data-footer-item>
            <p className="footer-connect-label">Connect</p>
            <div className="footer-social" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  className="footer-social-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-footer-social
                  key={link.label}
                >
                  <span className="footer-social-icon" aria-hidden="true">
                    {link.iconClass ? (
                      <i className={link.iconClass}></i>
                    ) : (
                      <span className="social-glyph social-glyph--x">
                        {link.glyph}
                      </span>
                    )}
                  </span>
                  <span className="footer-social-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <p className="footer-meta" data-footer-item>
            <span id="year">{year}</span> Subhramoy Bhowmik. React, Vite, CSS,
            Bootstrap, GSAP, Lenis, and SplitType.
          </p>
        </div>
      </div>
    </footer>
  );
}
