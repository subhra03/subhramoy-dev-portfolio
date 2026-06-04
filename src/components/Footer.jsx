const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#techstack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://github.com/subhra03",
    label: "GitHub",
    iconClass: "fab fa-github",
  },
  {
    href: "https://www.linkedin.com/in/subhramoy-bhowmik-8b6944242",
    label: "LinkedIn",
    iconClass: "fab fa-linkedin-in",
  },
  {
    href: "https://x.com/_Subhra_?t=nqgr3rA9jchbLufsed7obA&s=08",
    label: "X",
    glyph: "X",
  },
  {
    href: "https://youtube.com/@subhramoy-03?si=djr8I1rVZaC6ysdJ",
    label: "YouTube",
    iconClass: "fab fa-youtube",
  },
];

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
            {footerLinks.map((link, index) => (
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

          <div className="footer-social" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                className="footer-social-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                data-footer-social
                key={link.label}
              >
                {link.iconClass ? (
                  <i className={link.iconClass} aria-hidden="true"></i>
                ) : (
                  <span className="social-glyph social-glyph--x" aria-hidden="true">
                    {link.glyph}
                  </span>
                )}
              </a>
            ))}
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
