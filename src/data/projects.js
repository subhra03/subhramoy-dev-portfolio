import projectOneImage from "../../asset/1.png";
import projectTwoImage from "../../asset/2.png";
import projectThreeImage from "../../asset/3.png";
import projectFourImage from "../../asset/4.png";
import projectFiveImage from "../../asset/5.png";
import projectSixImage from "../../asset/6.png";
import projectSevenImage from "../../asset/7.png";
import projectEightImage from "../../asset/8.png";
import projectNineImage from "../../asset/9.png";

export const projectFilters = [
  { label: "All", value: "all" },
  { label: "UI", value: "ui" },
  { label: "React", value: "react" },
  { label: "Utility", value: "utility" },
];

export const projects = [
  {
    id: "personal-portfolio-ui",
    index: "01",
    categoryLabel: "Web UI concept",
    categories: ["ui", "frontend"],
    title: "Personal Portfolio UI",
    copy: "Modern responsive portfolio design showcasing skills, personality, and project highlights.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: projectOneImage,
    imageAlt: "Personal Portfolio project preview",
    link: "https://personal-website-portfolio-ui.vercel.app/",
  },
  {
    id: "bike-website-ui",
    index: "02",
    categoryLabel: "Ecommerce UI",
    categories: ["ui", "frontend"],
    title: "Bike Website UI",
    copy: "A bike ecommerce concept with immersive composition, product focus, and motion-led presentation.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: projectTwoImage,
    imageAlt: "Bike Website project preview",
    link: "https://bike-website-ui.vercel.app/",
  },
  {
    id: "bootstrap-portfolio",
    index: "03",
    categoryLabel: "Portfolio build",
    categories: ["ui", "frontend"],
    title: "Bootstrap Portfolio",
    copy: "A clean portfolio layout built with Bootstrap and a structured visual hierarchy.",
    tags: ["Bootstrap", "HTML", "CSS"],
    image: projectThreeImage,
    imageAlt: "Bootstrap Portfolio project preview",
    link: "https://bootstrap-portfolio-ui.vercel.app/",
  },
  {
    id: "expense-tracker",
    index: "04",
    categoryLabel: "Utility app",
    categories: ["react", "utility"],
    title: "Expense Tracker",
    copy: "A budgeting interface focused on clarity, quick tracking, and usable information flow.",
    tags: ["React", "JavaScript"],
    image: projectFourImage,
    imageAlt: "Expense Tracker project preview",
    link: "https://expense-tracker-vert-eight.vercel.app/",
  },
  {
    id: "student-reservation-system",
    index: "05",
    categoryLabel: "Form workflow",
    categories: ["utility", "frontend"],
    title: "Student Reservation System",
    copy: "A reservation flow centered around forms, structure, and straightforward interaction.",
    tags: ["HTML", "JavaScript"],
    image: projectFiveImage,
    imageAlt: "Student Reservation project preview",
    link: "https://student-reservation-system.vercel.app/",
  },
  {
    id: "loan-calculator",
    index: "06",
    categoryLabel: "Calculator UI",
    categories: ["react", "utility"],
    title: "Loan Calculator",
    copy: "A responsive calculator interface built around understandable inputs and clear output.",
    tags: ["React", "API"],
    image: projectSixImage,
    imageAlt: "Loan Calculator project preview",
    link: "https://loan-calculator-rouge-zeta.vercel.app/",
  },
  {
    id: "twitter-clone",
    index: "07",
    categoryLabel: "Product clone",
    categories: ["react", "ui"],
    title: "Twitter Clone",
    copy: "A social product interface recreated with familiar interaction patterns and React components.",
    tags: ["React", "JavaScript"],
    image: projectSevenImage,
    imageAlt: "Twitter Clone project preview",
    link: "https://twitter-clone-react-project.vercel.app/",
  },
  {
    id: "music-player",
    index: "08",
    categoryLabel: "Media interface",
    categories: ["ui", "frontend"],
    title: "Music Player",
    copy: "A music player concept focused on custom controls, atmosphere, and interaction quality.",
    tags: ["HTML", "JavaScript"],
    image: projectEightImage,
    imageAlt: "Music Player project preview",
    link: "https://sb-music-player.vercel.app/",
  },
  {
    id: "sb-clothing-store",
    index: "09",
    categoryLabel: "Ecommerce store",
    categories: ["react", "ui"],
    title: "SB Clothing Store",
    copy: "A printed clothing ecommerce store with product browsing, shopping-focused layout, and clear purchase flow.",
    tags: ["React", "Ecommerce", "Vercel"],
    image: projectNineImage,
    imageAlt: "SB Clothing Store project preview",
    link: "https://e-commerce-store-bay-seven.vercel.app/",
    githubLink:
      "https://github.com/subhra03/E-commerce-Clothing-Printed-SB-Store-",
  },
];
