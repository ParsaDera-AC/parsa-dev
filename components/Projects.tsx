"use client";

import React, { memo, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import { useLanguage } from "@/context";
import type { ProjectCategory, ProjectMeta } from "@/types";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ParsaDera-AC";

/* Presentation metadata only — every string lives in the locale files.
   `id` is keyed to locales/en.json → projects.items, so a typo fails to
   compile rather than rendering an empty panel. */
const PROJECTS: readonly ProjectMeta[] = [
  {
    id: "erms",
    image: "/Enterprise.jpg",
    category: "fullStack",
  },
  {
    id: "skiPatrol",
    image: "/skiPatrol.jpg",
    category: "fullStack",
    github: "https://github.com/ParsaDera-AC/Basic-Node.js-Project",
  },
  {
    id: "telegramAnalyzer",
    image: "/telegram.jpg",
    category: "dataScience",
  },
  {
    id: "picross",
    image: "/piccross.jpg",
    category: "gamedev",
  },
  {
    id: "sqoWebsite",
    image: "/sqogroup.jpg",
    category: "frontend",
    demo: "https://sqogroup.ca",
  },
];

const FILTERS: readonly (ProjectCategory | "all")[] = [
  "all",
  "fullStack",
  "frontend",
  "dataScience",
  "gamedev",
];

/* Height of the visible "envelope edge" left behind by each stacked panel.
   Must stay in sync with EDGE_REM below and the h-11 strip class. */
const EDGE_REM = 2.75;

const Projects: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const visible = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative py-section">
      <div className="shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{messages.projects.eyebrow}</p>
          <h2 className="mt-6 text-display-sm">{messages.projects.title}</h2>
          <p className="mt-5 max-w-measure leading-relaxed text-ink-muted">
            {messages.projects.subtitle}
          </p>
        </motion.div>

        {/* Category rail */}
        <div
          role="group"
          aria-label={messages.projects.title}
          className="no-bar mt-10 flex gap-6 overflow-x-auto border-b border-rule pb-px"
        >
          {FILTERS.map((key) => {
            const isActive = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={isActive}
                className={`relative -mb-px shrink-0 pb-3 text-sm transition-colors ${
                  isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                }`}
              >
                {messages.projects.categories[key]}
                {isActive && <span className="absolute inset-x-0 bottom-0 h-px bg-clay" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          Collapsing envelope stack.
          Each panel is sticky at a progressively larger top offset, so the
          next panel scrolls up over the previous one and leaves only its
          title strip (EDGE_REM tall) showing — a stack of envelope edges.
          This is pure CSS sticky positioning: no scroll listeners, no
          height measuring, and nothing to oscillate when panels resize.
          ================================================================ */}
      <div className="shell mt-14">
        {visible.map((project, i) => {
          const copy = messages.projects.items[project.id];
          const isLast = i === visible.length - 1;

          return (
            <div
              key={project.id}
              className="sticky"
              style={{
                top: `calc(var(--header-h) + ${i * EDGE_REM}rem)`,
                zIndex: i + 1,
              }}
            >
              <article
                className={`grain relative isolate overflow-hidden border-x border-t border-rule bg-paper ${
                  isLast ? "border-b" : ""
                }`}
              >
                {/* Envelope edge — stays visible once covered */}
                <div className="flex h-11 items-center gap-4 border-b border-rule px-5 lg:px-7">
                  <span className="index shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="min-w-0 flex-1 truncate font-display text-sm font-semibold tracking-normal">
                    {copy.title}
                  </h3>
                  <span className="hidden shrink-0 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint sm:block">
                    {messages.projects.categories[project.category]}
                  </span>
                </div>

                {/* Panel body */}
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-56 border-b border-rule sm:h-72 lg:h-[26rem] lg:border-b-0 lg:border-r">
                    <Image
                      src={project.image}
                      alt={copy.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-8 p-6 lg:p-10">
                    <div>
                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                        {copy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-5 leading-relaxed text-ink-muted">{copy.description}</p>

                      <ul className="mt-6 flex flex-wrap gap-2">
                        {copy.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="border border-rule px-2.5 py-1 text-xs text-ink-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw inline-flex items-center gap-2"
                        >
                          <FiGithub size={15} />
                          {messages.ui.viewCode}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-ink-faint">
                          <FiLock size={14} />
                          {messages.ui.privateRepo}
                        </span>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-draw inline-flex items-center gap-2"
                        >
                          <FiArrowUpRight size={15} />
                          {messages.ui.liveDemo}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* Spacer so the final panel can settle before the next section
          scrolls over the stack. */}
      <div aria-hidden="true" style={{ height: `${visible.length * EDGE_REM}rem` }} />

      <div className="shell mt-4">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw inline-flex items-center gap-2 text-sm"
        >
          {messages.projects.moreOnGithub}
          <FiArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
};

export default memo(Projects);
