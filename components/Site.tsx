'use client';

import Image from 'next/image';
import { useLanguage, useTheme } from '@/context';
import Nonogram from './Nonogram';
import AtonMap from './AtonMap';
import BotDemo from './BotDemo';

const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'parsa.derakhshan20@gmail.com';
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/ParsaDera-AC';
const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/parsa-derakhshan-1360a11b3/';
const SKI_REPO = 'https://github.com/ParsaDera-AC/Basic-Node.js-Project';
const SITE_REPO = 'https://github.com/ParsaDera-AC/parsa-dev';
const SQO_URL = 'https://sqogroup.ca/';
const RESUME = '/Parsa_Derakhshan_CV.pdf';

function TopBar() {
  const { messages, toggleLanguage } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="topbar">
      <button
        type="button"
        className="textbutton"
        onClick={toggleLanguage}
        lang={messages.ui.otherLanguageCode}
      >
        {messages.ui.otherLanguage}
      </button>
      <button type="button" className="textbutton" onClick={toggleTheme}>
        {isDarkMode ? messages.ui.lightMode : messages.ui.darkMode}
      </button>
    </div>
  );
}

function Intro() {
  const { messages } = useLanguage();
  const t = messages.intro;
  const n = messages.nav;
  return (
    <header className="intro">
      <div>
        <h1>Parsa Derakhshan</h1>
        <p className="role">{t.role}</p>
        <p>{t.p1}</p>
        <p>{t.p2}</p>
        <nav aria-label={n.label}>
          <ul>
            <li><a href="#experience">{n.experience}</a></li>
            <li><a href="#projects">{n.work}</a></li>
            <li><a href="#education">{n.education}</a></li>
            <li><a href="#tools">{n.tools}</a></li>
            <li><a href="#contact">{n.contact}</a></li>
            <li><a href={RESUME}>{n.resume}</a></li>
          </ul>
        </nav>
      </div>
      <figure className="photo">
        <Image src="/Avatar3.jpg" alt={t.photoAlt} width={1280} height={960} priority />
        <figcaption>{t.photoCaption}</figcaption>
      </figure>
    </header>
  );
}

/* Trimmed listing of github.com/ParsaDera-AC/Basic-Node.js-Project */
function RepoTree() {
  return (
    <pre className="tree" aria-label="Basic-Node.js-Project">
      {`Basic-Node.js-Project/
├── src/main/java/com/example/application/
│   ├── events/                 `}<span className="dim">endpoint, entity, repository</span>{`
│   ├── FinancialReport/        `}<span className="dim">endpoint, entity, repository</span>{`
│   ├── HumanResourcesHistory/  `}<span className="dim">endpoint, entity, repository</span>{`
│   └── TrainingHistory/        `}<span className="dim">endpoint, entity, repository</span>{`
└── frontend/
    ├── i18n/                   `}<span className="dim">en.json, fr.json</span>{`
    └── views/
        ├── events/events-view.ts
        ├── financial-report/financial-report-view.ts
        ├── hr-history/hr-history-view.ts
        └── training-history/training-history-view.ts`}
    </pre>
  );
}

function Projects() {
  const { messages } = useLanguage();
  const t = messages.work;
  const { inkplusbot, skiPatrol, picross, telegram } = t.items;
  return (
    <section className="sec" id="projects" aria-labelledby="projects-h">
      <h2 id="projects-h">{t.title}</h2>
      <div>
        <article className="entry">
          <h3>{inkplusbot.title}</h3>
          <p className="meta">{inkplusbot.meta}</p>
          <p>{inkplusbot.body}</p>
          <p className="links">{t.privateNote}</p>
          <figure>
            <h4 className="demo-title">{messages.bot.title}</h4>
            <BotDemo />
            <figcaption>{messages.bot.caption}</figcaption>
          </figure>
        </article>

        <article className="entry">
          <h3>{skiPatrol.title}</h3>
          <p className="meta">{skiPatrol.meta}</p>
          <p>{skiPatrol.body}</p>
          <p className="links">
            <a href={SKI_REPO}>{t.repo}</a>
          </p>
          <figure>
            <RepoTree />
            <figcaption>{skiPatrol.figureCaption}</figcaption>
          </figure>
        </article>

        <article className="entry">
          <h3>{picross.title}</h3>
          <p className="meta">{picross.meta}</p>
          <p>{picross.body}</p>
          <figure>
            <Nonogram />
            <figcaption>{picross.figureCaption}</figcaption>
          </figure>
        </article>

        <article className="entry">
          <h3>{telegram.title}</h3>
          <p className="meta">{telegram.meta}</p>
          <p>{telegram.body}</p>
        </article>
      </div>
    </section>
  );
}

function Experience() {
  const { messages } = useLanguage();
  const t = messages.experience;
  return (
    <section className="sec" id="experience" aria-labelledby="experience-h">
      <h2 id="experience-h">{t.title}</h2>
      <div>
        {t.items.map((job, i) => (
          <article className="entry" key={job.org}>
            <h3>{job.role}</h3>
            <p className="meta">
              {job.org} · {job.dates}
            </p>
            <p>{job.body}</p>
            {i === 0 && (
              <figure>
                <h4 className="demo-title">{messages.aton.title}</h4>
                <AtonMap />
                <figcaption>{messages.aton.caption}</figcaption>
              </figure>
            )}
            {i === t.items.length - 1 && (
              <figure>
                <a href={SQO_URL} className="block">
                  <Image
                    className="shot"
                    src="/sqogroup.jpg"
                    alt={t.sqoAlt}
                    width={1453}
                    height={793}
                  />
                </a>
                <figcaption>{t.sqoCaption}</figcaption>
              </figure>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Education() {
  const { messages } = useLanguage();
  const t = messages.education;
  return (
    <section className="sec" id="education" aria-labelledby="education-h">
      <h2 id="education-h">{t.title}</h2>
      <div className="entry">
        <h3>{t.program}</h3>
        <p className="meta">
          {t.school} · {t.dates}
        </p>
        <p>{t.body}</p>
      </div>
    </section>
  );
}

function Tools() {
  const { messages } = useLanguage();
  const t = messages.tools;
  return (
    <section className="sec" id="tools" aria-labelledby="tools-h">
      <h2 id="tools-h">{t.title}</h2>
      <div>
        <p>{t.intro}</p>
        <dl className="tools">
          {t.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Contact() {
  const { messages } = useLanguage();
  const t = messages.contact;
  return (
    <section className="sec" id="contact" aria-labelledby="contact-h">
      <h2 id="contact-h">{t.title}</h2>
      <div>
        <p>{t.body}</p>
        <a className="big-link" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <p className="mt-3">
          <a href={GITHUB_URL}>{t.github}</a>
          <span aria-hidden="true"> · </span>
          <a href={LINKEDIN_URL}>{t.linkedin}</a>
          <span aria-hidden="true"> · </span>
          <a href={RESUME}>{t.resume}</a>
        </p>
      </div>
    </section>
  );
}

export default function Site() {
  const { messages } = useLanguage();
  return (
    <div className="page" id="top">
      <a className="skip" href="#main">
        {messages.ui.skip}
      </a>
      <TopBar />
      <Intro />
      <main id="main">
        <Experience />
        <Projects />
        <Education />
        <Tools />
        <Contact />
      </main>
      <footer className="footer">
        <p>
          <a href={SITE_REPO}>{messages.footer.source}</a>
        </p>
        <p>
          <a href="#top">{messages.ui.backToTop}</a>
        </p>
      </footer>
    </div>
  );
}
