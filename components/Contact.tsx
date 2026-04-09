"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Email", href: "mailto:max@maxadolfsson.se", display: "max@maxadolfsson.se" },
  { label: "LinkedIn", href: "https://linkedin.com/in/maxadolfsson", display: "linkedin.com/in/maxadolfsson" },
  { label: "GitHub", href: "https://github.com/maxadolfsson", display: "github.com/maxadolfsson" },
];

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-8 md:px-16 py-24 md:py-36 bg-surface border-t border-border"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section index */}
        <motion.p
          className="text-sm uppercase tracking-[0.2em] text-accent font-display mb-12"
          {...inView(0)}
        >
          04 / Contact
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end">
          {/* Headline */}
          <motion.div {...inView(0.1)}>
            <h2
              className="font-display font-bold text-cream leading-[1.05]"
              style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
            >
              Let&rsquo;s build something
              <br />
              <span className="text-accent">worth using.</span>
            </h2>
            <p className="text-base text-muted leading-relaxed font-body mt-6 max-w-md">
              I&rsquo;m currently open to frontend and UI roles at agencies and
              design studios. If you work somewhere where craft matters — let&rsquo;s
              talk.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div className="space-y-6" {...inView(0.25)}>
            {links.map((link) => (
              <div key={link.label} className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.18em] text-muted font-display">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-base md:text-lg text-cream font-body accent-line inline-block hover:text-accent transition-colors duration-200"
                >
                  {link.display}
                </a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="flex items-center justify-between mt-20 pt-8 border-t border-border"
          {...inView(0.4)}
        >
          <span className="text-xs text-muted/50 font-display uppercase tracking-[0.15em]">
            Max Adolfsson
          </span>
          <span className="text-xs text-muted/50 font-body">
            © {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
