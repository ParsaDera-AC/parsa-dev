"use client";

import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context";

interface SoftSkill {
  title: string;
  description: string;
  skills: string[];
}

const SoftSkills: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();

  /* One shared reveal for the whole section — additive motion only. */
  const reveal = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const offset = reduce ? 0 : 16;

  /* The six entries, in document order. */
  const entries: SoftSkill[] = [
    messages.softSkills.leadership,
    messages.softSkills.problemSolving,
    messages.softSkills.communication,
    messages.softSkills.projectManagement,
    messages.softSkills.dataAnalysis,
    messages.softSkills.adaptability,
  ];

  return (
    <section id="softskills" className="relative isolate grain py-section">
      <div className="shell">
        {/* Heading block */}
        <motion.p
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reveal}
          className="eyebrow"
        >
          {messages.softSkills.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.06 }}
          className="mt-6 text-display-sm"
        >
          {messages.softSkills.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.12 }}
          className="mt-6 max-w-measure text-ink-muted"
        >
          {messages.softSkills.subtitle}
        </motion.p>

        {/* Ruled grid — one continuous table, not six floating cards */}
        <div className="mt-16 grid grid-cols-1 border-t border-l border-rule lg:mt-20 lg:grid-cols-3">
          {entries.map((entry, i) => (
            <motion.article
              key={entry.title}
              initial={{ opacity: 0, y: offset }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...reveal, delay: i * 0.05 }}
              className="border-r border-b border-rule p-6 transition-colors hover:bg-paper-sunk lg:p-8"
            >
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl">{entry.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {entry.description}
              </p>
              <ul className="mt-5 flex flex-wrap text-xs text-ink-faint">
                {entry.skills.map((skill, j) => (
                  <li key={skill} className="flex items-center">
                    {j > 0 && (
                      <span className="mx-1.5" aria-hidden="true">
                        ·
                      </span>
                    )}
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(SoftSkills);
