"use client";

import React, { memo, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaVuejs,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaJs,
  FaJava,
  FaCloud,
} from "react-icons/fa";
import {
  SiTypescript,
  SiDotnet,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";
import { useLanguage } from "@/context";
import type { SkillMeta, SkillCategory, LanguageBar } from "@/types";

/* Technology names and marks are proper nouns — they stay in code, only
   the surrounding copy comes from the locale files. */
const categoryOrder: SkillCategory[] = ["frontend", "backend", "database", "devops"];

const skills: SkillMeta[] = [
  { name: "React", icon: <FaReact />, category: "frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, category: "frontend" },
  { name: "Vue.js", icon: <FaVuejs />, category: "frontend" },
  { name: "Tailwind", icon: <SiTailwindcss />, category: "frontend" },
  { name: "Node.js", icon: <FaNodeJs />, category: "backend" },
  { name: ".NET Core", icon: <SiDotnet />, category: "backend" },
  { name: "Python", icon: <FaPython />, category: "backend" },
  { name: "Java", icon: <FaJava />, category: "backend" },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "database" },
  { name: "MySQL", icon: <SiMysql />, category: "database" },
  { name: "MongoDB", icon: <SiMongodb />, category: "database" },
  { name: "Docker", icon: <FaDocker />, category: "devops" },
  { name: "Azure", icon: <FaCloud />, category: "devops" },
  { name: "Git", icon: <FaGitAlt />, category: "devops" },
];

const languages: Array<LanguageBar & { icon: ReactNode }> = [
  { name: "TypeScript", level: 95, icon: <SiTypescript /> },
  { name: "JavaScript", level: 95, icon: <FaJs /> },
  { name: "Python", level: 90, icon: <FaPython /> },
  { name: "C#", level: 85, icon: <SiDotnet /> },
  { name: "Java", level: 80, icon: <FaJava /> },
];

const Skills: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();

  /* One shared reveal — additive motion only; content stays legible. */
  const reveal = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const offset = reduce ? 0 : 16;

  const index = (i: number) => String(i + 1).padStart(2, "0");

  /* Four techs read best on a 4-across row; three techs on 3-across.
     Class names are static literals so Tailwind's scanner keeps them. */
  const cols = (count: number) =>
    count >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section id="skills" className="relative isolate grain py-section">
      <div className="shell">
        {/* Heading block */}
        <motion.p
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reveal}
          className="eyebrow"
        >
          {messages.skills.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.06 }}
          className="mt-6 text-display-sm lg:text-display"
        >
          {messages.skills.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.12 }}
          className="mt-6 max-w-measure text-ink-muted"
        >
          {messages.skills.subtitle}
        </motion.p>

        {/* Technology directory — four indexed category blocks in sequence */}
        <div className="mt-16 space-y-12 lg:mt-20 lg:space-y-16">
          {categoryOrder.map((category, blockIndex) => {
            const items = skills.filter((skill) => skill.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: offset }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...reveal, delay: blockIndex * 0.04 }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="index">{index(blockIndex)}</span>
                  <h3 className="text-xl lg:text-2xl">
                    {messages.skills.categories[category]}
                  </h3>
                </div>

                <div
                  className={`mt-5 grid grid-cols-2 gap-3 ${cols(items.length)}`}
                >
                  {items.map((skill, cellIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: offset }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...reveal, delay: cellIndex * 0.04 }}
                      className="flex flex-col items-center justify-center gap-3 border border-rule p-4 text-center transition-colors hover:border-ink sm:p-5"
                    >
                      <span className="text-2xl text-ink-muted">{skill.icon}</span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Primary languages — thin hairline measures, clay fill */}
        <div className="mt-16 lg:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reveal}
            className="text-xl lg:text-2xl"
          >
            {messages.skills.languagesTitle}
          </motion.h3>

          <div className="mt-8 space-y-5">
            {languages.map((lang, i) => (
              <div
                key={lang.name}
                className="flex items-center gap-4 sm:gap-6"
              >
                <span className="flex w-24 shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] sm:w-32">
                  <span className="text-ink-faint">{lang.icon}</span>
                  {lang.name}
                </span>

                <div className="h-0.5 flex-1 bg-rule">
                  {reduce ? (
                    <div
                      className="h-full bg-clay"
                      style={{ width: `${lang.level}%` }}
                    />
                  ) : (
                    <motion.div
                      className="h-full bg-clay"
                      style={{ width: `${lang.level}%`, transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ ...reveal, delay: 0.1 + i * 0.04 }}
                    />
                  )}
                </div>

                <span className="w-10 shrink-0 text-right text-xs tnum text-ink-muted">
                  {lang.level}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology-mark strip — the institutional partner-logo pattern,
            rendered with the tool marks themselves. Names appear above,
            so this row is purely decorative. */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.15 }}
          className="mt-16 lg:mt-24"
        >
          <div
            aria-hidden="true"
            className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-rule pt-8"
          >
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="text-2xl text-ink-faint transition-colors hover:text-ink"
              >
                {skill.icon}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Always Learning — recessed panel, no icon circus */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.1 }}
          className="mt-16 lg:mt-24"
        >
          <div className="border border-rule bg-paper-sunk p-6 sm:p-10">
            <h3 className="text-xl lg:text-2xl">{messages.skills.learningTitle}</h3>
            <p className="mt-3 max-w-measure text-sm text-ink-muted">
              {messages.skills.learningDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Skills);
