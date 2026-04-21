import aboutPrimaryRaw from "../content/about-primary.txt?raw";
import aboutSecondaryRaw from "../content/about-secondary.txt?raw";
import experienceKlaviyoRaw from "../content/experience-klaviyo.txt?raw";
import experienceFreelanceRaw from "../content/experience-freelance.txt?raw";

const clean = (value: string) => value.trim();

export const profile = {
  name: "Max Adolfsson",
  title: "Frontend Engineer",
  tagline: "Building thoughtful, accessible web experiences.",
};

export const aboutParagraphs = [clean(aboutPrimaryRaw), clean(aboutSecondaryRaw)];

export const experienceItems = [
  {
    role: "Frontend Developer Internship",
    company: "Flowpass",
    period: "Jun2025 - Aug2025",
    description: "Developed and maintained the frontend of a web application using React, TypeScript, and Tailwind CSS to create a seamless user experience for the Flowpass platform.",
  },
];
