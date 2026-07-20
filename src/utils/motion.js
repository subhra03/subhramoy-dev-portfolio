export const smoothEasing = (time) => Math.min(1, 1.001 - 2 ** (-10 * time));

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const smallViewportQuery = "(max-width: 767.98px)";
export const finePointerQuery = "(hover: hover) and (pointer: fine)";
export const scrollProgressThreshold = 0.002;

const scrambleGlyphs = "01{}[]<>/#";

export const sectionColorThemes = {
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

export const normalizeHeadingText = (text) => text.replace(/\s+/g, " ").trim();

export const getScrambleGlyph = () =>
  scrambleGlyphs[Math.floor(Math.random() * scrambleGlyphs.length)];
