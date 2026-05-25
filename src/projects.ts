import atrRaw from "../content/atr.txt?raw";
import recordfreakRaw from "../content/recordfreak.txt?raw";
import strongliftRaw from "../content/stronglift.txt?raw";
import thesisWorkRaw from "../content/thesis-work.txt?raw";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  timeframe: string;
  year: string;
  tags: string[];
  overview: string;
  background: string;
  solution: string;
  heroImage: string | null;
  heroImages?: string[];
  previewImage: string | null;
  backgroundImage?: string;
  solutionImage?: string;
};

/** Optional overrides per slug: `content/projects/<slug>/project.json` */
type ProjectMetaJson = {
  title?: string;
  shortTitle?: string;
  tags?: string[];
};

const projectMetaModules = import.meta.glob("../content/projects/*/project.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

const slugFromMetaPath = (path: string): string | null => {
  const normalized = path.replaceAll("\\", "/");
  const match = normalized.match(/\/projects\/([^/]+)\/project\.json$/);
  return match?.[1] ?? null;
};

const asMeta = (value: unknown): ProjectMetaJson | null => {
  if (!value || typeof value !== "object") {
    return null;
  }
  const o = value as Record<string, unknown>;
  const meta: ProjectMetaJson = {};
  if (typeof o.title === "string") {
    meta.title = o.title;
  }
  if (typeof o.shortTitle === "string") {
    meta.shortTitle = o.shortTitle;
  }
  if (Array.isArray(o.tags) && o.tags.every((t): t is string => typeof t === "string")) {
    meta.tags = o.tags;
  }
  return meta;
};

const metaBySlug = new Map<string, ProjectMetaJson>();

for (const [path, data] of Object.entries(projectMetaModules)) {
  const slug = slugFromMetaPath(path);
  if (!slug) {
    continue;
  }
  const meta = asMeta(data);
  if (meta) {
    metaBySlug.set(slug, meta);
  }
}

const mergeProjectMeta = (project: Project): Project => {
  const meta = metaBySlug.get(project.slug);
  if (!meta) {
    return project;
  }
  return {
    ...project,
    ...(meta.title !== undefined ? { title: meta.title } : {}),
    ...(meta.shortTitle !== undefined ? { shortTitle: meta.shortTitle } : {}),
    ...(meta.tags !== undefined ? { tags: meta.tags } : {}),
  };
};

const clean = (value: string) => value.trim();

const baseProjects: Project[] = [
  {
    slug: "thesis-work",
    title: "Thesis Work",
    shortTitle: "Thesis Work",
    timeframe: "12 weeks",
    year: "2025",
    tags: ["Research + Product Design", "Agentic AI", "LangChain", "UX"],
    overview:
      "An agentic chatbot for the Flowpass platform, built with LangChain and custom tools to answer users based on their own environment data.",
    background: clean(thesisWorkRaw),
    heroImage: new URL("./img/mockups/thesis/chatUI.png", import.meta.url).href,
    previewImage: new URL("./img/mockups/thesis/chatUI.png", import.meta.url).href,
    solutionImage: new URL("./img/mockups/thesis/chatstream.gif", import.meta.url).href,
    solution:
      "An agentic chatbot for the Flowpass platform, using the LangChain framework to call custom tools making API-calls to the backend, and delivering answers on prompts regarding the user's platform environment.",
  },
  {
    slug: "flowpass-mobile-redesign",
    title: "Mobile app redesign",
    shortTitle: "Flowpass Mobile App",
    timeframe: "3 weeks",
    year: "2025",
    tags: ["Mobile UX", "Social features", "React/Typescript"],
    overview:
      "A social experience redesign and UI patch cycle focused on reducing confusion and cleaning up edge-case presentation across the mobile app.",
    background: "The community page of the Flowpass mobile app had no solution for clearly displaying both people in ones team and ones follow-list. This called for redesigning and rebuilding its frontend from scratch.",
    heroImage: new URL("./img/mockups/internships/community.png", import.meta.url).href,
    previewImage: new URL("./img/mockups/internships/community.png", import.meta.url).href,
    solutionImage: new URL("./img/mockups/internships/alsogoing.png", import.meta.url).href,
    solution:
      "A display from profile images give a discreet indication of which co-workers are booked for different sessions. A drawer complements this view by providing detailed information on the bookers.",
  },
  {
    slug: "bike-shop-wordpress-site",
    title: "And-The-Revolution's Website",
    shortTitle: "ATR Website Maintenence",
    timeframe: "6 weeks",
    year: "2026",
    tags: ["Web Design + WordPress", "client work", "wordpress", "frontend"],
    overview:
      "Correcting flaws in design and functionality in a custom Wordpress environment",
    background: clean(atrRaw),
    heroImage: new URL("./img/mockups/ATR/Cykelbyggaren.png", import.meta.url).href,
    previewImage: new URL("./img/mockups/ATR/Cykelbyggaren.png", import.meta.url).href,
    solution:
      "Patched tailpress theme and plugins to unify the websites design system. Refurbished a buggy bikebuilder plugin, ensuring correct image generation and price calculation",
  },
  {
    slug: "stronglift-assistant",
    title: "Stronglift 5x5 Tracker",
    shortTitle: "Stronglift",
    timeframe: "Ongoing",
    year: "2026",
    tags: ["Side Project", "fitness", "personal growth"],
    overview:
      "A private workout companion for StrongLift 5x5 that keeps sessions focused and tracks progression over time with minimal friction.",
    background: clean(strongliftRaw),
    heroImage: new URL("./img/mockups/strongliftHome.png", import.meta.url).href,
    heroImages: [
      new URL("./img/mockups/strongliftHome.png", import.meta.url).href,
      new URL("./img/mockups/strongLiftMidWork1.png", import.meta.url).href,
    ],
    previewImage: new URL("./img/mockups/strongLiftMidWork1.png", import.meta.url).href,
    backgroundImage: new URL("./img/mockups/historyWorkForm.png", import.meta.url).href,
    solutionImage: new URL("./img/mockups/ChartStronglift.png", import.meta.url).href,
    solution:
      "An app is hosted for private use as mobile website. It keeps all numbers noted, and helps setting workout weights based on ones progress. One can also add a videos to the logs to review ones form. I displays progress in charts, overtime for each exercise. All phases, including hosting, are vibe coded in Cursor.",
  }

];

/** Highest 4-digit year in the label, for list order (newest first). */
const sortYearValue = (year: string): number => {
  const years = year.match(/\d{4}/g);
  if (!years?.length) {
    return 0;
  }
  return Math.max(...years.map(Number));
};

export const projects: Project[] = [...baseProjects.map(mergeProjectMeta)].sort(
  (a, b) => sortYearValue(b.year) - sortYearValue(a.year),
);
