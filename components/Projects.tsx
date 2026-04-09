"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { projects } from "@/lib/projects";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isCardLifted, setIsCardLifted] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const activeProject = useMemo(
    () => projects[activeIndex] ?? projects[0],
    [activeIndex],
  );

  const clearHideTimer = () => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const showPreview = (index: number) => {
    clearHideTimer();
    setActiveIndex(index);
    setIsPreviewVisible(true);
  };

  const keepPreviewVisible = () => {
    clearHideTimer();
    setIsPreviewVisible(true);
  };

  const queueHidePreview = () => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setIsPreviewVisible(false);
    }, 2500);
  };

  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  return (
    <section id="projects" className="-mt-14 px-6 py-20 sm:-mt-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <Link
          href={`/projects/${activeProject.slug}`}
          onMouseEnter={() => {
            keepPreviewVisible();
            setIsCardLifted(true);
          }}
          onMouseLeave={() => {
            setIsCardLifted(false);
            queueHidePreview();
          }}
          onFocus={() => {
            keepPreviewVisible();
            setIsCardLifted(true);
          }}
          onBlur={() => {
            setIsCardLifted(false);
            queueHidePreview();
          }}
          aria-label={`Open ${activeProject.title} case study`}
          className={`relative overflow-hidden rounded-4xl border border-zinc-200 bg-zinc-900 text-white transition-all duration-500 ease-out lg:sticky lg:top-24 ${
            isPreviewVisible
              ? isCardLifted
                ? "translate-x-0 scale-[1.045] opacity-100 shadow-2xl"
                : "translate-x-0 scale-[1.02] opacity-100 shadow-2xl"
              : "-translate-x-10 scale-[0.985] opacity-0"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full"
            >
              {activeProject.heroImage ? (
                <Image
                  src={activeProject.heroImage}
                  alt={activeProject.title}
                  className="h-[360px] w-full object-cover opacity-80 sm:h-[420px]"
                />
              ) : (
                <div className="project-image-placeholder h-[360px] w-full sm:h-[420px]" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-300">
                  {activeProject.category}
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {activeProject.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-200 sm:text-base">
                  {activeProject.teaser}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-500/60 bg-zinc-700/40 px-2.5 py-1 text-xs text-zinc-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {activeProject.previewImages[0] ? (
                  <Image
                    src={activeProject.previewImages[0]}
                    alt={`${activeProject.title} preview`}
                    className="mt-5 h-28 w-full rounded-xl border border-white/10 object-cover"
                  />
                ) : (
                  <div
                    className="project-image-placeholder mt-5 h-28 w-full rounded-xl border border-white/10"
                    aria-hidden
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Link>

        <div onMouseLeave={queueHidePreview} onBlur={queueHidePreview}>
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
              Projects
            </h2>
            <span className="text-sm text-zinc-400">{projects.length}</span>
          </div>
          <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={project.slug}
                  className="relative"
                  onMouseEnter={() => showPreview(index)}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    onFocus={() => showPreview(index)}
                    className="group flex items-center justify-between gap-6 py-5 transition-colors hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none"
                  >
                    <span
                      className={`text-xl tracking-tight transition-colors sm:text-2xl ${
                        isActive
                          ? "font-semibold text-zinc-900"
                          : "font-medium text-zinc-700 group-hover:text-zinc-900"
                      }`}
                    >
                      {project.shortTitle}
                    </span>
                    <div className="text-right">
                      <p className="text-sm text-zinc-600">{project.category}</p>
                      <p className="text-xs text-zinc-400">{project.timeframe}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-zinc-500">
            Hover to preview, click to open the full case study.
          </p>
        </div>
      </div>
    </section>
  );
}
