"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen grid-bg flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 md:px-16 pt-8 pb-0">
        <motion.span
          className="text-sm uppercase tracking-[0.15em] text-muted font-display"
          {...fadeUp(0)}
        >
          Max Adolfsson
        </motion.span>
        <motion.nav className="flex gap-8" {...fadeUp(0.1)}>
          {["About", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm uppercase tracking-[0.12em] text-muted hover:text-cream transition-colors duration-200 accent-line"
            >
              {item}
            </a>
          ))}
        </motion.nav>
      </header>

      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-20">
        <div className="max-w-[1200px]">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] text-accent mb-6 font-display"
            {...fadeUp(0.2)}
          >
            Frontend Developer — Stockholm
          </motion.p>

          <motion.h1
            className="font-display font-bold text-cream leading-[1.0] mb-10"
            style={{ fontSize: "clamp(52px, 8vw, 108px)" }}
            {...fadeUp(0.3)}
          >
            Built with logic.
            <br />
            Designed with intent.
          </motion.h1>

          <motion.div
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16"
            {...fadeUp(0.5)}
          >
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-lg font-body">
              I&rsquo;m Max — a frontend developer with a fullstack foundation
              and a genuine obsession with the overlap between engineering and
              design. I build things that work beautifully.
            </p>
            <a
              href="#projects"
              className="flex-shrink-0 inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-cream font-display group"
            >
              <span className="w-10 h-px bg-accent group-hover:w-16 transition-all duration-300" />
              View work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Accent rule */}
      <motion.div
        className="h-px bg-border mx-8 md:mx-16"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.8, ease }}
      />
    </section>
  );
}
