export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  year: string;
  tags: string[];
  overview: string;
  previewImage: string | null;
  bodyHtml: string;
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

const projectBodyModules = import.meta.glob("../content/projects/*/body.html", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const projectImageModules = {
  ...import.meta.glob("./img/**/*.{png,jpg,jpeg,gif,webp,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  ...import.meta.glob("../content/gif/**/*.{png,jpg,jpeg,gif,webp,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
} as Record<string, string>;

const slugFromProjectPath = (path: string, file: string): string | null => {
  const normalized = path.replaceAll("\\", "/");
  const match = normalized.match(new RegExp(`/projects/([^/]+)/${file}$`));
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
  const slug = slugFromProjectPath(path, "project.json");
  if (!slug) {
    continue;
  }
  const meta = asMeta(data);
  if (meta) {
    metaBySlug.set(slug, meta);
  }
}

const bodyBySlug = new Map<string, string>();

for (const [path, html] of Object.entries(projectBodyModules)) {
  const slug = slugFromProjectPath(path, "body.html");
  if (slug && typeof html === "string") {
    bodyBySlug.set(slug, html.trim());
  }
}

const applyPlaceholders = (html: string, assets: Record<string, string>) =>
  html.replace(/\{\{(\w+)\}\}/g, (_, key: string) => assets[key] ?? "");

const img = (path: string) => {
  const assetUrl = projectImageModules[path];
  if (!assetUrl) {
    throw new Error(`Missing project image "${path}"`);
  }
  return assetUrl;
};

/** Card metadata + asset placeholders per slug. Body markup lives in `content/projects/<slug>/body.html`. */
const baseProjects: Array<Omit<Project, "bodyHtml"> & { assets?: Record<string, string> }> = [
  {
    slug: "thesis-work",
    title: "Thesis Work",
    shortTitle: "Thesis Work",
    year: "2025",
    tags: ["Research + Product Design", "Agentic AI", "LangChain", "UX"],
    overview:
      "An agentic chatbot for the Flowpass platform, built with LangGraph and custom tools that answer questions using each user's environment data.",
    previewImage: img("./img/mockups/thesis/chatUI.png"),
    assets: {
      heroImage: img("./img/mockups/thesis/chatUI.png"),
      solutionImage: img("./img/mockups/thesis/chatstream.gif"),
    },
  },
  {
    slug: "flowpass-mobile-redesign",
    title: "Mobile app redesign",
    shortTitle: "Flowpass Mobile App",
    year: "2025",
    tags: ["Mobile UX", "Social features", "React/Typescript"],
    overview:
      "A social experience redesign and UI patch cycle focused on reducing confusion and tightening edge-case presentation across the mobile app.",
    previewImage: img("./img/mockups/internships/community.png"),
    assets: {
      heroImage: img("./img/mockups/internships/community.png"),
      solutionImage: img("./img/mockups/internships/alsogoing.png"),
    },
  },
  {
    slug: "bike-shop-wordpress-site",
    title: "ATR's Website Cleanup",
    shortTitle: "ATR Website",
    year: "2026",
    tags: ["Web Design + WordPress", "client work", "wordpress", "frontend"],
    overview:
      "Fixing design and functionality issues in a custom WordPress environment for a Stockholm bike shop.",
    previewImage: img("./img/mockups/ATR/hero.png"),
    assets: {
      heroImage: img("./img/mockups/ATR/mainpage.png"),
      bbBefore: img("./img/mockups/ATR/bbBefore2.png"),
      bbAfter: img("./img/mockups/ATR/bbAfter2.png"),
      checkoutBefore: img("./img/mockups/ATR/CheckoutBefore.png"),
      checkoutAfter: img("./img/mockups/ATR/CheckoutAfter.png"),
      fontFamilyBefore: img("./img/mockups/ATR/FontFamilyBefore.png"),
      fontFamilyAfter: img("./img/mockups/ATR/FontFamilyAfter.png"),
      wooGalleryBefore: img("../content/gif/woogallerybefore.gif"),
      wooGalleryAfter: img("../content/gif/woogalleryafter.gif"),
    },
  },
  {
    slug: "stronglift-assistant",
    title: "Stronglift 5x5 Logger",
    shortTitle: "Stronglift",
    year: "2026",
    tags: ["Side Project", "fitness", "personal growth"],
    overview:
      "A workout logger for StrongLift 5×5, logging progress within each session and gains over time.",
    previewImage: img("./img/mockups/strongLiftMidWork1.png"),
    assets: {
      heroImage1: img("./img/mockups/strongliftHome.png"),
      heroImage2: img("./img/mockups/strongLiftMidWork1.png"),
      backgroundImage: img("./img/mockups/historyWorkForm.png"),
      solutionImage: img("./img/mockups/ChartStronglift.png"),
    },
  },
];

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

const toProject = (
  base: Omit<Project, "bodyHtml"> & { assets?: Record<string, string> },
): Project => {
  const rawBody = bodyBySlug.get(base.slug);
  if (!rawBody) {
    throw new Error(`Missing body.html for project "${base.slug}"`);
  }

  const bodyHtml = base.assets ? applyPlaceholders(rawBody, base.assets) : rawBody;
  const { assets: _assets, ...rest } = base;

  return mergeProjectMeta({ ...rest, bodyHtml });
};

/** Highest 4-digit year in the label, for list order (newest first). */
const sortYearValue = (year: string): number => {
  const years = year.match(/\d{4}/g);
  if (!years?.length) {
    return 0;
  }
  return Math.max(...years.map(Number));
};

export const projects: Project[] = [...baseProjects.map(toProject)].sort(
  (a, b) => sortYearValue(b.year) - sortYearValue(a.year),
);
