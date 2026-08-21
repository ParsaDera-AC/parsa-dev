"use client";

import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { useLanguage } from "@/context";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ParsaDera-AC";
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/parsa-dera-1360a11b3";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "contact@parsaderakhshan.com";

const Footer: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();

  /* One shared reveal for the whole footer — additive motion only. */
  const reveal = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const offset = reduce ? 0 : 16;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Section anchors, labelled from the locale files. */
  const quickLinks = [
    { href: "#about", label: messages.nav.about },
    { href: "#projects", label: messages.nav.projects },
    { href: "#skills", label: messages.nav.skills },
    { href: "#softskills", label: messages.nav.softskills },
    { href: "#resume", label: messages.nav.resume },
    { href: "#contact", label: messages.nav.contact },
  ];

  return (
    /* Stays dark in both themes — a closing slab to match the hero. Values
       are literal rather than tokenised for exactly that reason. */
    <footer className="relative isolate grain bg-[#14110F] text-[#FAF8F5]">
      <div className="shell-wide pt-section pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Wordmark + tagline */}
          <motion.div
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reveal}
            className="lg:col-span-5"
          >
            <a href="#home" className="group inline-flex items-baseline gap-2">
              <span className="font-display text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-[#FAF8F5]">
                Parsa
              </span>
              <span className="h-3 w-px bg-[#D2603C]" aria-hidden="true" />
              <span className="font-display text-[0.95rem] font-medium uppercase tracking-[0.14em] text-[rgba(250,248,245,0.62)] transition-colors group-hover:text-[#FAF8F5]">
                Derakhshan
              </span>
            </a>
            <p className="mt-6 max-w-measure text-sm leading-relaxed text-[rgba(250,248,245,0.62)]">
              {messages.footer.tagline}
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.nav
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...reveal, delay: 0.05 }}
            aria-label={messages.footer.quickLinks}
            className="lg:col-span-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(250,248,245,0.45)]">
              {messages.footer.quickLinks}
            </h4>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[rgba(250,248,245,0.62)] transition-colors hover:text-[#FAF8F5]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...reveal, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(250,248,245,0.45)]">
              {messages.footer.connect}
            </h4>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded border border-[rgba(250,248,245,0.14)] text-[rgba(250,248,245,0.62)] transition-colors hover:border-[#FAF8F5] hover:text-[#FAF8F5]"
              >
                <FaGithub size={15} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded border border-[rgba(250,248,245,0.14)] text-[rgba(250,248,245,0.62)] transition-colors hover:border-[#FAF8F5] hover:text-[#FAF8F5]"
              >
                <FaLinkedin size={15} />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[rgba(250,248,245,0.45)]">
                {messages.footer.emailLabel}
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-[#D2603C] transition-colors hover:text-[#FAF8F5]"
              >
                {EMAIL}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...reveal, delay: 0.15 }}
          className="mt-16 flex flex-col gap-4 border-t border-[rgba(250,248,245,0.14)] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-[rgba(250,248,245,0.45)]">
            © {new Date().getFullYear()} Parsa Derakhshan. {messages.footer.rights}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 self-start rounded border border-[rgba(250,248,245,0.14)] px-3 py-2 text-sm text-[rgba(250,248,245,0.62)] transition-colors hover:border-[#FAF8F5] hover:text-[#FAF8F5] sm:self-auto"
          >
            <FiArrowUp size={14} />
            {messages.ui.backToTop}
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default memo(Footer);
