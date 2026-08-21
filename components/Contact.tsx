"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiAlertCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context";
import type { ContactFormData } from "@/types";

const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ParsaDera-AC";
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/parsa-dera-1360a11b3";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? "contact@parsaderakhshan.com";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/* If any credential is missing the form must not pretend to send. It says so
   and points at the mailto: fallback instead. */
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

const EMPTY: ContactFormData = { name: "", email: "", message: "" };

const Contact: React.FC = () => {
  const { messages } = useLanguage();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const socials = useMemo(
    () => [
      { label: "GitHub", icon: <FaGithub size={17} />, url: GITHUB_URL },
      { label: "LinkedIn", icon: <FaLinkedin size={17} />, url: LINKEDIN_URL },
      { label: messages.footer.emailLabel, icon: <FaEnvelope size={17} />, url: `mailto:${EMAIL}` },
    ],
    [messages.footer.emailLabel]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setStatus((prev) => (prev === "error" || prev === "unconfigured" ? "idle" : prev));
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!IS_CONFIGURED) {
        setStatus("unconfigured");
        return;
      }

      setStatus("sending");
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            reply_to: form.email,
            message: form.message,
          },
          { publicKey: PUBLIC_KEY }
        );
        setStatus("sent");
        setForm(EMPTY);
      } catch (error) {
        console.error("Contact form submission failed:", error);
        setStatus("error");
      }
    },
    [form]
  );

  const isBusy = status === "sending";
  const field =
    "w-full border border-rule bg-paper-sunk px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-clay disabled:opacity-60";
  const label = "block text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint";

  return (
    <section id="contact" className="relative py-section">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{messages.contact.eyebrow}</p>
          <h2 className="mt-6 text-display-sm">{messages.contact.title}</h2>
          <p className="mt-5 max-w-measure leading-relaxed text-ink-muted">
            {messages.contact.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-px border border-rule bg-rule lg:grid-cols-12">
          {/* Left: connect */}
          <div className="bg-paper p-6 lg:col-span-5 lg:p-10">
            <h3 className="font-display text-xl">{messages.contact.connectTitle}</h3>
            <p className="mt-4 leading-relaxed text-ink-muted">{messages.contact.description}</p>

            <ul className="mt-8 border-t border-rule">
              {socials.map((s) => (
                <li key={s.label} className="border-b border-rule">
                  <a
                    href={s.url}
                    target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={s.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 py-4 text-sm transition-colors hover:text-clay"
                  >
                    <span className="text-ink-faint transition-colors group-hover:text-clay">
                      {s.icon}
                    </span>
                    <span className="flex-1">{s.label}</span>
                    <FiArrowUpRight
                      size={15}
                      className="text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-clay"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 border border-rule bg-paper-sunk p-5">
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-clay">
                {messages.contact.quickResponse}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {messages.contact.responseMessage}
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-paper p-6 lg:col-span-7 lg:p-10">
            <form ref={formRef} onSubmit={onSubmit} noValidate={false} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className={label} htmlFor="contact-name">
                    {messages.contact.form.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={onChange}
                    disabled={isBusy}
                    placeholder={messages.contact.form.namePlaceholder}
                    className={field}
                  />
                </div>
                <div className="space-y-2">
                  <label className={label} htmlFor="contact-email">
                    {messages.contact.form.email}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    disabled={isBusy}
                    placeholder={messages.contact.form.emailPlaceholder}
                    className={field}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={label} htmlFor="contact-message">
                  {messages.contact.form.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  disabled={isBusy}
                  placeholder={messages.contact.form.messagePlaceholder}
                  className={`${field} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="submit"
                  disabled={isBusy || status === "sent"}
                  className="inline-flex items-center gap-2 bg-clay px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-deep disabled:opacity-60"
                >
                  {status === "sent" ? (
                    <>
                      <FiCheck size={16} />
                      {messages.ui.sent}
                    </>
                  ) : isBusy ? (
                    <>
                      <span
                        className="h-3.5 w-3.5 animate-spin border border-white/40 border-t-white"
                        aria-hidden="true"
                      />
                      {messages.ui.sending}
                    </>
                  ) : (
                    <>
                      {messages.contact.form.submit}
                      <FiArrowUpRight size={16} />
                    </>
                  )}
                </button>

                {/* Status is announced, never silently swallowed */}
                <p aria-live="polite" className="text-sm">
                  {status === "error" && (
                    <span className="inline-flex items-center gap-2 text-clay">
                      <FiAlertCircle size={15} />
                      {messages.ui.errorGeneric}
                    </span>
                  )}
                  {status === "unconfigured" && (
                    <span className="inline-flex items-center gap-2 text-clay">
                      <FiAlertCircle size={15} />
                      {messages.ui.notConfigured}
                    </span>
                  )}
                </p>
              </div>

              {(status === "error" || status === "unconfigured") && (
                <p className="text-sm text-ink-muted">
                  <a href={`mailto:${EMAIL}`} className="link-draw">
                    {EMAIL}
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
