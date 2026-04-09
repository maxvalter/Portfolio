"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease, delay },
});

export default function About() {
  return (
    <section id="about" className="px-8 md:px-16 py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto">
        {/* Section index */}
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-accent font-display mb-12"
          {...inView(0)}
        >
          01 / About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — headline */}
          <motion.div {...inView(0.1)}>
            <h2
              className="font-display font-bold text-cream leading-[1.05]"
              style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
            >
              Engineer by training.
              <br />
              Designer{" "}
              <span className="font-serif italic font-normal text-muted">
                by choice.
              </span>
            </h2>
          </motion.div>

          {/* Right — bio */}
          <motion.div className="space-y-5" {...inView(0.25)}>
            <p className="text-base md:text-lg text-muted leading-relaxed font-body">
              I studied computer science — master&rsquo;s degree and all — and
              came out the other side more interested in how things feel than
              how they&rsquo;re implemented. The technical foundation matters,
              but it&rsquo;s the interface that someone actually lives in.
            </p>
            <p className="text-base md:text-lg text-muted leading-relaxed font-body">
              I&rsquo;ve worked across fullstack development, AI and LLM
              engineering, and UI work. Right now I&rsquo;m most excited by
              frontend roles at agencies and studios where craft is taken
              seriously — where the last 10% of polish is not optional.
            </p>
            <p className="text-base md:text-lg text-muted leading-relaxed font-body">
              Based in Stockholm. Open to new projects.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
