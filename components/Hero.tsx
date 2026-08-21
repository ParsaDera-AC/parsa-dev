"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ParsaDera-AC";
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/parsa-dera-1360a11b3";

/* The hero stays dark in both themes — the institutional pattern of a dark
   full-bleed banner against light content pages. Values are literal rather
   than tokenised for exactly that reason. */
const INK = "#14110F";
const BONE = "#FAF8F5";

const Hero: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();

  const line = {
    hidden: { y: reduce ? 0 : "105%" },
    show: (i: number) => ({
      y: 0,
      transition: { duration: 0.85, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.45 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section
      id="home"
      className="relative isolate grain overflow-hidden"
      style={{ backgroundColor: INK, color: BONE }}
    >
      <div className="shell-wide flex min-h-dvh flex-col justify-end pb-10 pt-header">
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.p
              custom={0}
              variants={fade}
              initial="hidden"
              animate="show"
              className="eyebrow"
              style={{ color: "rgba(250,248,245,0.55)" }}
            >
              {messages.hero.eyebrow}
            </motion.p>

            <h1 className="mt-7">
              <span className="block overflow-hidden">
                <motion.span
                  custom={0}
                  variants={line}
                  initial="hidden"
                  animate="show"
                  className="block text-display-lg font-extrabold"
                >
                  {messages.hero.name}
                </motion.span>
              </span>
              <span className="mt-1 block overflow-hidden">
                <motion.span
                  custom={1}
                  variants={line}
                  initial="hidden"
                  animate="show"
                  className="block text-display font-light"
                  style={{ color: "#D2603C" }}
                >
                  {messages.hero.title}
                </motion.span>
              </span>
            </h1>

            <motion.p
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-8 max-w-measure text-lg leading-relaxed"
              style={{ color: "rgba(250,248,245,0.68)" }}
            >
              {messages.hero.description}
            </motion.p>

            <motion.div
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-clay px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-deep"
              >
                {messages.hero.viewWork}
                <FiArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border px-6 py-3.5 text-sm font-medium transition-colors"
                style={{ borderColor: "rgba(250,248,245,0.24)", color: BONE }}
              >
                {messages.hero.contact}
              </a>

              <span
                className="mx-1 hidden h-8 w-px sm:block"
                style={{ backgroundColor: "rgba(250,248,245,0.16)" }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-1">
                {[
                  { href: GITHUB_URL, label: "GitHub", Icon: FaGithub },
                  { href: LINKEDIN_URL, label: "LinkedIn", Icon: FaLinkedin },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center transition-opacity hover:opacity-100"
                    style={{ color: BONE, opacity: 0.6 }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portrait — offset, hairline-framed, no glow or gradient ring */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden"
                style={{ backgroundColor: "rgba(250,248,245,0.04)" }}
              >
                <Image
                  src="/Avatar5.jpg"
                  alt={messages.hero.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Corner registration marks — a printer's mark, not decoration */}
              <span
                className="absolute -left-2 -top-2 h-6 w-6 border-l border-t"
                style={{ borderColor: "#D2603C" }}
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-2 -right-2 h-6 w-6 border-b border-r"
                style={{ borderColor: "#D2603C" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {/* Baseline meta row */}
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between border-t pt-6 text-xs"
          style={{ borderColor: "rgba(250,248,245,0.14)", color: "rgba(250,248,245,0.5)" }}
        >
          <span className="uppercase tracking-[0.16em]">{messages.hero.location}</span>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 uppercase tracking-[0.16em] transition-colors hover:text-white"
          >
            {messages.hero.scroll}
            <FiArrowDown
              size={13}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Hero);
