"use client";

import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context";

const AboutMe: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();

  /* One shared reveal for the whole section — additive motion only. */
  const reveal = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const offset = reduce ? 0 : 16;

  /* The four editorial rows, in document order. */
  const cards = [
    messages.about.cards.education,
    messages.about.cards.experience,
    messages.about.cards.expertise,
    messages.about.cards.achievements,
  ];

  const index = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="about" className="relative isolate grain py-section">
      <div className="shell">
        {/* Heading block */}
        <motion.p
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reveal}
          className="eyebrow"
        >
          {messages.about.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.06 }}
          className="mt-6 text-display"
        >
          {messages.about.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.12 }}
          className="mt-6 max-w-measure text-ink-muted"
        >
          {messages.about.description}
        </motion.p>

        {/* Stats band — numbers with hairline dividers, not glassy cards */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reveal}
          className="mt-16 border-y border-rule py-10 lg:mt-20 lg:py-12"
        >
          <p className="eyebrow">{messages.stats.eyebrow}</p>

          <div className="mt-8 grid grid-cols-1 divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {messages.stats.items.map((item) => (
              <div
                key={item.label}
                className="py-7 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="font-display text-display-sm tnum">{item.value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Editorial list — index + title left, description + chips right */}
        <ol className="mt-16 lg:mt-20">
          {cards.map((card, i) => (
            <motion.li
              key={card.title}
              initial={{ opacity: 0, y: offset }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...reveal, delay: i * 0.06 }}
              className="grid gap-4 border-t border-rule py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
            >
              <div className="lg:col-span-4">
                <span className="index">{index(i)}</span>
                <h3 className="mt-3 font-display text-xl lg:text-2xl">{card.title}</h3>
              </div>

              <div className="lg:col-span-8">
                <p className="max-w-measure text-ink-muted">{card.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {card.stats.map((stat) => (
                    <li
                      key={stat}
                      className="border border-rule px-2.5 py-1 text-xs text-ink-muted"
                    >
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default memo(AboutMe);
