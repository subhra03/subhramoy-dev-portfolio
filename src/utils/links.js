import { socialLinks } from "../data/socialLinks";

export const githubProfileLink =
  socialLinks.find((link) => link.label === "GitHub")?.href ||
  "https://github.com/subhra03";
