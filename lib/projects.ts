import type { StaticImageData } from "next/image";

import flowpassChat from "../content/img/flowpass/Chatwindow.png";
import flowpassScreen from "../content/img/flowpass/flowpass-screen.png";
import strongliftGif from "../content/gif/2026-04-09 16.04.37.gif";

/** Keep static imports as `StaticImageData` so `next/image` gets width/height. */
export type ProjectImageSource = string | StaticImageData;

export type ProjectDetailSection = {
  heading: string;
  body: string;
};

/** `null` renders the diagonal-line placeholder instead of a photo */
export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  timeframe: string;
  year: string;
  tags: string[];
  teaser: string;
  overview: string;
  heroImage: ProjectImageSource | null;
  previewImages: (ProjectImageSource | null)[];
  galleryImages: (ProjectImageSource | null)[];
  detailSections: ProjectDetailSection[];
};

export const projects: Project[] = [
  {
    slug: "thesis-work",
    title: "Thesis Work",
    shortTitle: "Thesis",
    category: "Research + Product Design",
    timeframe: "12 weeks",
    year: "2024",
    tags: ["academic", "ux", "service design"],
    teaser:
      "A research-driven thesis from framing to final concept, balancing usability evidence with visual clarity.",
    overview:
      "This thesis explores how digital services can reduce friction in first-time use. I led interviews, mapped journey pain points, and translated insights into interaction patterns and prototypes.",
    heroImage: flowpassChat,
    previewImages: [flowpassChat, flowpassScreen],
    galleryImages: [flowpassChat, flowpassScreen, null, null],
    detailSections: [
      {
        heading: "Background",
        body: "The project started with a broad challenge around onboarding complexity. I narrowed scope by identifying moments where users dropped out early and framed the thesis around confidence-building interactions.",
      },
      {
        heading: "Approach",
        body: "I combined interviews, lightweight diary notes, and iterative wireframing. Findings were translated into component-level design principles that could be validated quickly with clickable prototypes.",
      },
      {
        heading: "Outcome",
        body: "The final concept improved first-session completion and gave clearer feedback at each step. The work package includes process documentation, visual system guidelines, and future implementation recommendations.",
      },
    ],
  },
  {
    slug: "bike-shop-wordpress",
    title: "Bike Shop WordPress Site",
    shortTitle: "Bike Shop",
    category: "Web Design + WordPress",
    timeframe: "6 weeks",
    year: "2023",
    tags: ["client work", "wordpress", "frontend"],
    teaser:
      "A practical website for a local bike shop with clear services, booking flow, and maintainable content structure.",
    overview:
      "I helped a local bike shop move from fragmented social posts to a reliable website. The project focused on service clarity, trust signals, and fast content updates for staff.",
    heroImage: null,
    previewImages: [null, null],
    galleryImages: [null, null, null, null],
    detailSections: [
      {
        heading: "Background",
        body: "The bike shop needed a single source of truth for services, pricing, and contact details. Existing channels were hard to navigate and often outdated.",
      },
      {
        heading: "Approach",
        body: "I restructured content into simple page templates and reusable blocks in WordPress. This reduced publishing friction and gave staff confidence to update copy and images regularly.",
      },
      {
        heading: "Outcome",
        body: "The site made core information discoverable in a few clicks and improved incoming lead quality. The owner now maintains campaigns and seasonal updates without developer support.",
      },
    ],
  },
  {
    slug: "stronglift-assistant",
    title: "Stronglift Assistant",
    shortTitle: "Stronglift",
    category: "Side Project",
    timeframe: "Ongoing",
    year: "2023",
    tags: ["side project", "fitness", "personal growth"],
    teaser:
      "A training assistant that tracks progression and keeps sessions goal-focused before, during, and after workouts.",
    overview:
      "Stronglift Assistant is a personal utility app to reduce friction in gym tracking. It surfaces what to do next, what changed since last session, and how close you are to your goals.",
    heroImage: strongliftGif,
    previewImages: [strongliftGif, null],
    galleryImages: [strongliftGif, null, null, null],
    detailSections: [
      {
        heading: "Background",
        body: "I built this to remove decision fatigue during training. Existing tracking apps often required too much manual setup and did not keep momentum visible at a glance.",
      },
      {
        heading: "Approach",
        body: "The app centers around session intent and progressive overload logic. I iterated quickly on small UI improvements to keep logging fast, even mid-workout.",
      },
      {
        heading: "Outcome",
        body: "The current version is a practical daily tool for my own routine. Next steps include trend visualization and lightweight social accountability features.",
      },
    ],
  },
  {
    slug: "recordfreak",
    title: "Recordfreak",
    shortTitle: "Recordfreak",
    category: "Spotify API Experiment",
    timeframe: "WIP",
    year: "WIP",
    tags: ["side project", "entertainment", "api"],
    teaser:
      "A playful Spotify API concept exploring music identity, listening patterns, and social sharing ideas.",
    overview:
      "Recordfreak is an experimental app built for curiosity and fun. It plays with music metadata to create compact user profiles and surprising listening snapshots.",
    heroImage: null,
    previewImages: [null, null],
    galleryImages: [null, null, null, null],
    detailSections: [
      {
        heading: "Background",
        body: "The goal was to build a lightweight sandbox around Spotify data and test interaction ideas quickly without over-architecting.",
      },
      {
        heading: "Approach",
        body: "I prototyped multiple profile cards and ranking views, validating what felt interesting rather than what felt complete. This keeps the project playful and exploratory.",
      },
      {
        heading: "Outcome",
        body: "Still in progress. The concept already demonstrates API integration and visual direction, and it serves as a test bed for future social and discovery features.",
      },
    ],
  },
];

export const projectSlugs = projects.map((project) => project.slug);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
