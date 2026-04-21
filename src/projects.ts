export type Project = {
  title: string;
  category: string;
  timeframe: string;
  year: string;
  tags: string[];
  teaser: string;
};

export const projects: Project[] = [
  {
    title: "Thesis Work",
    category: "Research + Product Design",
    timeframe: "12 weeks",
    year: "2024",
    tags: ["academic", "ux", "service design"],
    teaser:
      "Research-driven thesis work from discovery to concept, with a focus on first-use confidence.",
  },
  {
    title: "Bike Shop WordPress Site",
    category: "Web Design + WordPress",
    timeframe: "6 weeks",
    year: "2023",
    tags: ["client work", "wordpress", "frontend"],
    teaser:
      "A practical service website for a local bike shop, designed for clarity and easy updates.",
  },
  {
    title: "Stronglift Assistant",
    category: "Side Project",
    timeframe: "Ongoing",
    year: "2023",
    tags: ["side project", "fitness", "personal growth"],
    teaser:
      "A training assistant to keep gym sessions focused and progression visible before and after workouts.",
  },
  {
    title: "Recordfreak",
    category: "Spotify API Experiment",
    timeframe: "WIP",
    year: "WIP",
    tags: ["side project", "entertainment", "api"],
    teaser:
      "A playful API experiment exploring listening patterns and music identity snapshots.",
  },
];
