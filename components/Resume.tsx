"use client";

import React, { memo, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiLock, FiUnlock, FiDownload, FiAlertCircle } from "react-icons/fi";
import { useDocuments, useLanguage } from "@/context";

/* NOTE: NEXT_PUBLIC_* values are inlined into the client bundle at build
   time, so this gate is a courtesy speed-bump, not access control — the code
   is readable in devtools by anyone who looks. Treat the PDF as public.
   Real gating would require the file to live behind a server route or a
   signed, expiring URL. */
const ACCESS_CODE = process.env.NEXT_PUBLIC_RESUME_ACCESS_CODE ?? "";
const IS_CONFIGURED = ACCESS_CODE.length > 0;

type Status = "idle" | "checking" | "unlocked" | "invalid" | "unconfigured";

const Resume: React.FC = () => {
  const { messages, language } = useLanguage();
  const { getSecureDocumentUrl } = useDocuments();
  const reduce = useReducedMotion();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const documentUrl = getSecureDocumentUrl("resume", language);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Without a configured code, refuse rather than letting "" match "".
      if (!IS_CONFIGURED) {
        setStatus("unconfigured");
        return;
      }

      const entered = code.trim();
      if (entered.length === 0) {
        setStatus("invalid");
        return;
      }

      setStatus("checking");
      await new Promise((resolve) => setTimeout(resolve, 450));

      if (entered.toLowerCase() === ACCESS_CODE.trim().toLowerCase()) {
        setStatus("unlocked");
      } else {
        setStatus("invalid");
      }
    },
    [code]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setStatus((prev) => (prev === "invalid" || prev === "unconfigured" ? "idle" : prev));
  }, []);

  const isUnlocked = status === "unlocked";
  const isChecking = status === "checking";

  return (
    <section id="resume" className="relative bg-paper-sunk py-section">
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl"
        >
          <p className="eyebrow">{messages.resume.eyebrow}</p>
          <h2 className="mt-6 text-display-sm">{messages.resume.title}</h2>
          <p className="mt-5 leading-relaxed text-ink-muted">{messages.resume.subtitle}</p>

          <div className="mt-10 border border-rule bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-rule pb-5">
              <span className={isUnlocked ? "text-clay" : "text-ink-faint"}>
                {isUnlocked ? <FiUnlock size={17} /> : <FiLock size={17} />}
              </span>
              <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                {isUnlocked ? messages.resume.unlocked : messages.resume.accessCodeLabel}
              </span>
            </div>

            {isUnlocked ? (
              /* A real anchor to the actual file. The previous version left a
                 type="submit" button here, so "Download" just re-submitted
                 the form and never produced the PDF. */
              <div className="pt-6">
                <a
                  href={documentUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 bg-clay px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-clay-deep"
                >
                  <FiDownload size={16} />
                  {messages.resume.download}
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="pt-6">
                <label className="sr-only" htmlFor="resume-code">
                  {messages.resume.accessCodeLabel}
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="resume-code"
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    value={code}
                    onChange={onChange}
                    disabled={isChecking}
                    placeholder={messages.resume.placeholder}
                    aria-invalid={status === "invalid"}
                    aria-describedby={status === "invalid" ? "resume-error" : undefined}
                    className={`w-full border bg-paper-sunk px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-faint disabled:opacity-60 ${
                      status === "invalid" ? "border-clay" : "border-rule focus:border-clay"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="inline-flex shrink-0 items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {isChecking ? (
                      <>
                        <span
                          className="h-3.5 w-3.5 animate-spin border border-paper/40 border-t-paper"
                          aria-hidden="true"
                        />
                        {messages.resume.verifying}
                      </>
                    ) : (
                      messages.resume.submit
                    )}
                  </button>
                </div>

                <p aria-live="polite" id="resume-error" className="mt-4 text-sm">
                  {status === "invalid" && (
                    <span className="inline-flex items-center gap-2 text-clay">
                      <FiAlertCircle size={15} />
                      {messages.resume.invalidCode}
                    </span>
                  )}
                  {status === "unconfigured" && (
                    <span className="inline-flex items-center gap-2 text-clay">
                      <FiAlertCircle size={15} />
                      {messages.ui.notConfigured}
                    </span>
                  )}
                </p>
              </form>
            )}

            <p className="mt-6 border-t border-rule pt-5 text-sm text-ink-muted">
              {messages.resume.noCode}{" "}
              <a href="#contact" className="link-draw">
                {messages.resume.contactMe}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Resume);
