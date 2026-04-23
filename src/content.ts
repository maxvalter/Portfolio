import aboutPrimaryRaw from "../content/about-primary.txt?raw";
import aboutMinimalRaw from "../content/about-minimal.txt?raw";
import flowpassChatwindow from "../content/img/flowpass/Chatwindow.png";
import flowpassScreen from "../content/img/flowpass/flowpass-screen.png";

const clean = (value: string) => value.trim();
const toTimeValue = (value: Date | null) => (value ? value.getTime() : Number.POSITIVE_INFINITY);

export type Time = {
  start: Date;
  end: Date | null;
};

export type ExperienceImage = {
  src: string;
  alt: string;
};

export const profile = {
  name: "Max Adolfsson",
  title: "Frontend Engineer",
  tagline: aboutMinimalRaw,
};

export const aboutParagraphs = [clean(aboutPrimaryRaw)];

const rawExperienceItems = [
  {
    role: "Frontend & UX",
    company: "And-The-Revolution",
    time: {
      start: new Date(2026, 3),
      end: null,
    },
    description: "Cleaned up and realigned a WordPress site to follow the brand's design system, redesigned product pages to extend interaction, and improved the UX of their bicycle builder tool. Small scope, real client, shipped.",
    details:
      "Worked closely with client feedback and iterated fast on the existing WordPress setup. I focused on improving information hierarchy, reducing friction in the bike builder flow, and creating more consistent product page layouts so visitors could compare and configure bikes more confidently.",
    stack: ["Wordpress", "PHP", "Javascript"],
    link: "https://andtherev.com/",
  },
  {
    role: "Frontend Developer Internship",
    company: "Flowpass",
    time: {
      start: new Date(2025, 5),
      end: new Date(2025, 9),
    },
    description: "Built and maintained the frontend of Flowpass's admin panel and mobile app — a web application for managing flexible office and coworking bookings. Worked across the full frontend stack with React, TypeScript, and GraphQL, shipping features directly used by operators on the platform.",
    details:
      "Took ownership of production features from design handoff to release, including booking flows, list/detail views, and internal tooling for workspace operators. I collaborated daily with product and backend teammates and helped improve UI consistency and performance in high-traffic parts of the app.",
    images: [
      {
        src: flowpassScreen,
        alt: "Flowpass dashboard view",
      },
    ],
  },
  {
    role: "Thesis Worker",
    company: "Flowpass",
    time: {
      start: new Date(2025, 9),
      end: new Date(2026, 2),
    },
    description: "Designed and built an agentic chatbot for production in Flowpass's admin panel — an LLM with tool-calling against a live database, letting operators query and navigate the platform through natural language. The academic layer focused on how enterprise users form trust in LLM-driven work tools, with model output evaluation for precision and relevance in a real production environment.",
    details:
      "The thesis covered both implementation and evaluation. I designed prompts, tool schemas, and fallback behavior for safer responses in production, then studied trust formation through qualitative feedback and output quality measurements. The result was a practical assistant embedded in a real operator workflow.",
    images: [
      {
        src: flowpassChatwindow,
        alt: "Flowpass chatbot interface inside the admin panel",
      },
      {
        src: flowpassScreen,
        alt: "Flowpass admin interface context for the chatbot",
      },
    ],
  },
] satisfies Array<{
  role: string;
  company: string;
  time: Time;
  description: string;
  details?: string;
  images?: ExperienceImage[];
  stack?: string[];
  link?: string;
}>;

export const experienceItems = [...rawExperienceItems].sort((a, b) => {
  const startDiff = b.time.start.getTime() - a.time.start.getTime();
  if (startDiff !== 0) {
    return startDiff;
  }

  return toTimeValue(b.time.end) - toTimeValue(a.time.end);
});
