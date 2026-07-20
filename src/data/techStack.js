import typescriptIcon from "../../asset/tech/typescript.svg";
import viteIcon from "../../asset/tech/vite.svg";
import webpackIcon from "../../asset/tech/webpack.svg";

export const techStackGroups = [
  {
    id: "foundation",
    index: "01",
    label: "Foundation",
    copy: "Structure, styling, and browser logic for every interface.",
  },
  {
    id: "interface",
    index: "02",
    label: "Interface Layer",
    copy: "Component systems and responsive UI production.",
  },
  {
    id: "motion",
    index: "03",
    label: "Interaction",
    copy: "Motion and scroll details that make pages feel deliberate.",
  },
  {
    id: "workflow",
    index: "04",
    label: "Delivery",
    copy: "Tooling, versioning, and build habits for repeatable shipping.",
  },
];

export const techStack = [
  {
    name: "HTML5",
    group: "foundation",
    copy: "Semantic structure and accessible content.",
    iconClass: "fab fa-html5 tech-icon text-danger",
  },
  {
    name: "CSS3",
    group: "foundation",
    copy: "Responsive layout, motion, and system styling.",
    iconClass: "fab fa-css3-alt tech-icon text-primary",
  },
  {
    name: "JavaScript",
    group: "foundation",
    copy: "Interaction logic and polished browser behavior.",
    iconClass: "fab fa-js tech-icon text-warning",
  },
  {
    name: "Bootstrap",
    group: "interface",
    copy: "Fast scaffolding when the problem calls for it.",
    iconClass: "fab fa-bootstrap tech-icon text-purple",
  },
  {
    name: "React",
    group: "interface",
    copy: "Component-driven interfaces with scalable patterns.",
    iconClass: "fab fa-react tech-icon text-info",
  },
  {
    name: "Git",
    group: "workflow",
    copy: "Versioned workflows and disciplined iteration.",
    iconClass: "fab fa-git-alt tech-icon text-danger",
  },
  {
    name: "GitHub",
    group: "workflow",
    copy: "Shipping, collaboration, and public code presence.",
    iconClass: "fab fa-github tech-icon",
  },
  {
    name: "TypeScript",
    group: "foundation",
    copy: "Safer UI logic and stronger component contracts.",
    image: typescriptIcon,
  },
  {
    name: "Sass",
    group: "interface",
    copy: "Structured styling for reusable design systems.",
    iconClass: "fab fa-sass tech-icon text-pink",
  },
  {
    name: "NPM",
    group: "workflow",
    copy: "Everyday package and tooling workflow management.",
    iconClass: "fab fa-npm tech-icon text-danger",
  },
  {
    name: "Webpack",
    group: "workflow",
    copy: "Bundling assets into performant web builds.",
    image: webpackIcon,
  },
  {
    name: "VS Code",
    group: "workflow",
    copy: "The daily editor for fast, careful implementation.",
    iconClass: "fas fa-code tech-icon text-info",
  },
  {
    name: "Vite",
    group: "workflow",
    copy: "Fast React development with modern build tooling.",
    image: viteIcon,
  },
  {
    name: "GSAP",
    group: "motion",
    copy: "Smooth timeline-based motion and scroll interactions.",
    iconClass: "fas fa-wand-magic-sparkles tech-icon text-success",
  },
  {
    name: "Lenis",
    group: "motion",
    copy: "Refined smooth scrolling for polished page movement.",
    iconClass: "fas fa-scroll tech-icon text-info",
  },
  {
    name: "SplitType",
    group: "motion",
    copy: "Controlled text splitting for reveal and scramble effects.",
    iconClass: "fas fa-font tech-icon text-purple",
  },
];
