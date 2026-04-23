import atrRaw from "../content/atr.txt?raw";
import recordfreakRaw from "../content/recordfreak.txt?raw";
import strongliftRaw from "../content/stronglift.txt?raw";
import thesisWorkRaw from "../content/thesis-work.txt?raw";

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
  longdesc: string;
  heroImage: string | null;
  previewImage: string | null;
};

const clean = (value: string) => value.trim();

export const projects: Project[] = [
  {
    slug: "thesis-work",
    title: "Thesis Work",
    shortTitle: "Thesis Work",
    category: "Research + Product Design",
    timeframe: "12 weeks",
    year: "2025",
    tags: ["Agentic AI", "AI Development", "UX"],
    teaser: clean(thesisWorkRaw),
    overview:
      "An agentic chatbot for the Flowpass platform, built with LangChain and custom tools to answer users based on their own environment data.",
    heroImage: new URL("./img/chatstream.gif", import.meta.url).href,
    previewImage: new URL("./img/chatstream.gif", import.meta.url).href,
    longdesc: "An agentic chatbot for the Flowpass platform, using the LangChain framework to call custom tools making API-calls to the backend, and delivering answers on prompts regarding the user's platform environment."
  },
  {
    slug: "flowpass-mobile-redesign",
    title: "Mobile app redesigning + patching",
    shortTitle: "Flowpass Mobile App",
    category: "Research + Product Design",
    timeframe: "4 weeks",
    year: "2025",
    tags: ["Agentic AI", "AI Development", "UX"],
    teaser: clean(thesisWorkRaw),
    overview:
      "A social experience redesign and UI patch cycle focused on reducing confusion and cleaning up edge-case presentation across the mobile app.",
    heroImage: new URL("../content/img/flowpass/flowpass-screen.png", import.meta.url).href,
    previewImage: new URL("../content/img/flowpass/Chatwindow.png", import.meta.url).href,
    longdesc: "The initial tasks of my internship at Flowpass included a redesign of the social component, simplifying the users different views to reduce confusion and keep interactions effective. \n\n Too finish of this period, I patched design flaws in the mobile frontend, such as date presentation for opening hours, including special days."
  },
  {
    slug: "bike-shop-wordpress-site",
    title: "And-The-Revolution's Website",
    shortTitle: "ATR Website Maintenence",
    category: "Web Design + WordPress",
    timeframe: "6 weeks",
    year: "2026",
    tags: ["client work", "wordpress", "frontend"],
    teaser: clean(atrRaw),
    overview:
      "Correcting flaws in design and functionality in a custom Wordpress environment",
    heroImage: null,
    previewImage: null,
    longdesc: "Patched tailpress theme and plugins to unify the websites design system. Refurbished a buggy bikebuilder plugin, ensuring correct image generation and price calculation"
  },
  {
    slug: "stronglift-assistant",
    title: "Stronglift Assistant",
    shortTitle: "Stronglift",
    category: "Side Project",
    timeframe: "Ongoing",
    year: "2026",
    tags: ["side project", "fitness", "personal growth"],
    teaser: clean(strongliftRaw),
    overview:
      "A private workout companion for StrongLift 5x5 that keeps sessions focused and tracks progression over time with minimal friction.",
    heroImage: new URL("../content/gif/2026-04-09 16.04.37.gif", import.meta.url).href,
    previewImage: new URL("../content/gif/2026-04-09 16.04.37.gif", import.meta.url).href,
    longdesc: "To track my progress within workouts and overtime fitness gains, an app is hosted for private use as mobile website. It is designed for the StrongLift 5x5 exercise program, keeps all numbers noted, and displays progress overtime for each exercise"
  },
  {
    slug: "recordfreak",
    title: "Recordfreak",
    shortTitle: "Recordfreak",
    category: "Spotify API Experiment",
    timeframe: "3 weeks",
    year: "2025",
    tags: ["side project", "entertainment", "api"],
    teaser: clean(recordfreakRaw),
    overview:
      "An experimental Spotify API app that presents your saved albums as a playful wall-like record collection interface.",
    heroImage: null,
    previewImage: null,
    longdesc: "A web app built with Spotify Web API, presenting ones saved albums as a on the wall record collection. Provides an alternative interface for interacting with ones record collection."
  },

];
