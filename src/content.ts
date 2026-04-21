import aboutPrimaryRaw from "../content/about-primary.txt?raw";
import aboutMinimalRaw from "../content/about-minimal.txt?raw";

const clean = (value: string) => value.trim();

export type Time = {
  start: Date;
  end: Date | null;
};

export const profile = {
  name: "Max Adolfsson",
  title: "Frontend Engineer",
  tagline: aboutMinimalRaw,
};

export const aboutParagraphs = [clean(aboutPrimaryRaw)];

export const experienceItems = [
  {
    role: "Frontend & UX",
    company: "And-The-Revolution",
    time: {
      start: new Date(2026, 3),
      end: null,
    },
    description: "Cleaned up and realigned a WordPress site to follow the brand's design system, redesigned product pages to extend interaction, and improved the UX of their bicycle builder tool. Small scope, real client, shipped.",
    stack: ["Wordpress", "PHP", "Javascript"],
    link: "https://andtherev.com/",
  },
  {
    role: "Frontend Developer Internship",
    company: "Flowpass",
    time: {
      start: new Date(2025, 5),
      end: new Date(2026, 9),
    },
    description: "Built and maintained the frontend of Flowpass's admin panel and mobile app — a web application for managing flexible office and coworking bookings. Worked across the full frontend stack with React, TypeScript, and GraphQL, shipping features directly used by operators on the platform.",
  },
  {
    role: "Thesis Worker",
    company: "Flowpass",
    time: {
      start: new Date(2025, 9),
      end: new Date(2026, 2),
    },
    description: "Designed and built an agentic chatbot for production in Flowpass's admin panel — an LLM with tool-calling against a live database, letting operators query and navigate the platform through natural language. The academic layer focused on how enterprise users form trust in LLM-driven work tools, with model output evaluation for precision and relevance in a real production environment.",
  },
] satisfies Array<{
  role: string;
  company: string;
  time: Time;
  description: string;
  stack?: string[];
  link?: string;
}>;
