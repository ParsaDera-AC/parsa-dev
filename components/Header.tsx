"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { useLanguage, useTheme } from "@/context";
import type { SupportedLanguage } from "@/types";

const NAV_IDS = ["about", "projects", "skills", "softskills", "resume", "contact"] as const;
type NavId = (typeof NAV_IDS)[number];

/* Section ids in document order, used for the scroll spy. */
const SPY_IDS: readonly string[] = ["home", ...NAV_IDS];

const LANGUAGES: readonly SupportedLanguage[] = ["en", "fr"];

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { messages, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll spy via IntersectionObserver rather than measuring offsetTop on
     every scroll event — no layout thrashing, and it stays correct when
     sections resize. */
  useEffect(() => {
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const go = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-header transition-colors duration-300 ${
        isScrolled || isMenuOpen
          ? "border-b border-rule bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell-wide flex h-full items-center justify-between gap-8">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          className="group flex shrink-0 items-baseline gap-2"
        >
          <span className="font-display text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-ink">
            Parsa
          </span>
          <span className="h-3 w-px bg-clay" aria-hidden="true" />
          <span className="font-display text-[0.95rem] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors group-hover:text-ink">
            Derakhshan
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_IDS.map((id: NavId) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => go(e, id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {messages.nav[id]}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-px h-px bg-clay"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher — segmented, top-right */}
          <div
            role="group"
            aria-label={messages.ui.selectLanguage}
            className="flex items-center rounded border border-rule"
          >
            {LANGUAGES.map((lang) => {
              const isCurrent = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={isCurrent}
                  className={`px-2.5 py-1 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    isCurrent
                      ? "bg-ink text-paper"
                      : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-9 w-9 place-items-center rounded border border-rule text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            {isDarkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          {/* Primary CTA — the only filled control in the header */}
          <a
            href="#contact"
            onClick={(e) => go(e, "contact")}
            className="hidden rounded bg-clay px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-clay-deep sm:inline-block"
          >
            {messages.hero.contact}
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? messages.ui.close : messages.ui.menu}
            className="grid h-9 w-9 place-items-center rounded border border-rule text-ink transition-colors hover:border-ink lg:hidden"
          >
            {isMenuOpen ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-rule bg-paper lg:hidden"
          >
            <ul className="shell-wide flex flex-col py-2">
              {NAV_IDS.map((id: NavId, i) => (
                <li key={id} className={i > 0 ? "border-t border-rule" : undefined}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => go(e, id)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="index">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`font-display text-2xl font-bold ${
                        active === id ? "text-clay" : "text-ink"
                      }`}
                    >
                      {messages.nav[id]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default memo(Header);
