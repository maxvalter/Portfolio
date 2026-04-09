"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Frontend & UI",
    items: ["React / Next.js", "CSS / Tailwind", "Figma / InDesign", "WordPress"],
  },
  {
    label: "Fullstack",
    items: ["Node.js", "REST APIs", "Databases", "Git"],
  },
  {
    label: "AI & Emerging",
    items: ["LLM integration", "Tool calling", "Prompt design", "Agentic UX"],
  },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

export default function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-24 md:py-36 border-t border-border">
      <div className="max-w-[1200px] mx-auto">
        {/* Section index */}
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-accent font-display mb-12"
          {...inView(0)}
        >
          03 / Skills & tools
        </motion.p>

        <div className="grid md:grid-cols-3 gap-0 border border-border">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              className={`p-8 md:p-10 ${i < skillGroups.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
              {...inView(i * 0.1)}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-display mb-6">
                {group.label}
              </p>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-cream font-body">
                    <span className="w-1 h-1 rounded-full bg-muted/50 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
