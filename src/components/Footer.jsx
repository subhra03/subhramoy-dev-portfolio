import { socialLinks } from "../data/socialLinks";

export default function Footer({ year }) {
  return (
    <footer className="site-footer" data-footer-reveal>
      <div className="container">
        <div className="footer-shell">
          <div className="footer-main" data-footer-item>
            <p className="footer-kicker">Software developer portfolio</p>
            <p className="footer-copy">
              Web experiences with clean structure, responsive detail, and
              intentional motion.
            </p>
          </div>

          <div className="footer-bottom" data-footer-item>
            <p className="footer-meta">
              <span id="year">{year}</span> Subhramoy Bhowmik. All rights
              reserved.
            </p>
            <div className="footer-social" aria-label="Social links">
              {socialLinks.map((link) => (
                <a
                  className="footer-social-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-footer-social
                  aria-label={link.label}
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
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
