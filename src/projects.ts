import atrRaw from "../content/atr.txt?raw";
import recordfreakRaw from "../content/recordfreak.txt?raw";
import strongliftRaw from "../content/stronglift.txt?raw";
import thesisWorkRaw from "../content/thesis-work.txt?raw";

export type Project = {
  title: string;
  category: string;
  timeframe: string;
  year: string;
  tags: string[];
  teaser: string;
};

const clean = (value: string) => value.trim();

export const projects: Project[] = [
  {
    title: "Thesis Work",
    category: "Research + Product Design",
    timeframe: "12 weeks",
    year: "2024",
    tags: ["academic", "ux", "service design"],
    teaser: clean(thesisWorkRaw),
  },
  {
    title: "Bike Shop WordPress Site",
    category: "Web Design + WordPress",
    timeframe: "6 weeks",
    year: "2023",
    tags: ["client work", "wordpress", "frontend"],
    teaser: clean(atrRaw),
  },
  {
    title: "Stronglift Assistant",
    category: "Side Project",
    timeframe: "Ongoing",
    year: "2023",
    tags: ["side project", "fitness", "personal growth"],
    teaser: clean(strongliftRaw),
  },
  {
    title: "Recordfreak",
    category: "Spotify API Experiment",
    timeframe: "WIP",
    year: "WIP",
    tags: ["side project", "entertainment", "api"],
    teaser: clean(recordfreakRaw),
  },
];
