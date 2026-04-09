"use client";

import { motion } from "framer-motion";

const projects = [
  {
    index: "01",
    headline: "Giving a database a voice.",
    client: "LLM Chatbot — Master&rsquo;s Thesis",
    description:
      "An LLM-powered chatbot capable of making live calls against a structured database. Translates plain-language questions into real-time queries. The project explored interface design for AI systems that aren't always predictable.",
    tags: ["AI / LLM", "Tool calling", "UX for AI", "Research"],
  },
  {
    index: "02",
    headline: "Patchwork for the coolest bike shop in Stockholm.",
    client: "And The Revolution — WordPress",
    description:
      "And The Revolution is a modular bicycle concept store in central Stockholm. Their WordPress site had accumulated interaction bugs and design inconsistencies that undermined the brand. Resolved core technical issues and contributed to a design lift that aligned the site with the shop's bold identity.",
    tags: ["WordPress", "UI/UX", "Bug fixing", "Brand consistency"],
  },
  {
    index: "03",
    headline: "Track workouts and stay focused.",
    client: "Stronglift Tracker — Personal Project",
    description:
      "A personal web app built around the Stronglift 5×5 training programme. Lets me log sessions, track progression over time, and access assistive features. No over-engineering — just a tool that solves a real need.",
    tags: ["Personal project", "Frontend", "Data & tracking"],
  },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto">
        {/* Section index */}
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-accent font-display mb-12"
          {...inView(0)}
        >
          02 / Projects
        </motion.p>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[number];
  delay: number;
}) {
  return (
    <motion.article
      className="group relative border border-border rounded-sm p-8 md:p-10 bg-canvas hover:bg-surface hover:-translate-y-1 transition-all duration-300"
      style={{
        boxShadow: "0 0 0 0 rgba(255,77,0,0)",
        transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
      whileHover={{
        boxShadow: "0 0 0 1px rgba(255,77,0,0.4)",
      }}
      {...{
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.7, ease, delay },
      }}
    >
      {/* Accent top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-t-sm" />

      <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
        {/* Index */}
        <span className="text-sm font-display text-muted/50 tabular-nums pt-1">
          {project.index}
        </span>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted font-display">
            {project.client.replace(/&rsquo;/g, "'")}
          </p>
          <h3
            className="font-display font-bold text-cream leading-tight"
            style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
          >
            {project.headline}
          </h3>
          <p className="text-base text-muted leading-relaxed font-body max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-[0.12em] text-muted border border-border px-3 py-1 font-display"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <span className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 text-xl mt-1 hidden md:block">
          →
        </span>
      </div>
    </motion.article>
  );
}
