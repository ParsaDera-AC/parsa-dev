'use client';

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLanguage } from '@/context';
import { say, type BotLang } from './botStrings';

type Msg = { from: 'bot' | 'me' | 'note'; text: string };
type Btn = { label: string; go: Step };
type Step =
  | 'start'
  | { lang: BotLang }
  | 'menu'
  | 'ink'
  | 'buy'
  | 'number'
  | 'toner'
  | 'callback'
  | 'nothanks'
  | 'human';

/* Telegram-style *bold* and _italic_, nothing else. */
function md(text: string): ReactNode {
  return text.split('\n').map((line, i, all) => (
    <Fragment key={i}>
      {line.split(/(\*[^*]+\*|_[^_]+_)/g).map((part, j) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <strong key={j}>{part.slice(1, -1)}</strong>
        ) : part.startsWith('_') && part.endsWith('_') && part.length > 2 ? (
          <em key={j}>{part.slice(1, -1)}</em>
        ) : (
          part
        )
      )}
      {i < all.length - 1 && <br />}
    </Fragment>
  ));
}

export default function BotDemo() {
  const { messages } = useLanguage();
  const t = messages.bot;
  const [lang, setLang] = useState<BotLang>('en');
  const [log, setLog] = useState<Msg[]>([]);
  const [buttons, setButtons] = useState<Btn[]>([]);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const reply = (bot: Msg[], next: Btn[]) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setButtons([]);
    if (reduce) {
      setLog((l) => [...l, ...bot]);
      setButtons(next);
      return;
    }
    setTyping(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setLog((l) => [...l, ...bot]);
      setButtons(next);
    }, 650);
  };

  const menu = (l: BotLang): Btn[] => [
    { label: say('menu.ink', l), go: 'ink' },
    { label: say('menu.human', l), go: 'human' },
  ];

  const run = (step: Step, l: BotLang = lang) => {
    if (step === 'start') {
      setLog([]);
      reply(
        [
          { from: 'bot', text: say('welcome.intro', 'en') },
          { from: 'bot', text: say('language.prompt', 'en') },
        ],
        [
          { label: 'English', go: { lang: 'en' } },
          { label: 'Français', go: { lang: 'fr' } },
          { label: 'فارسی', go: { lang: 'fa' } },
        ]
      );
      return;
    }
    if (typeof step === 'object') {
      setLang(step.lang);
      reply([{ from: 'bot', text: say('menu.prompt', step.lang) }], menu(step.lang));
      return;
    }
    switch (step) {
      case 'menu':
        reply([{ from: 'bot', text: say('menu.prompt', l) }], menu(l));
        break;
      case 'ink':
        reply([{ from: 'bot', text: say('ink.ask.intent', l) }], [
          { label: say('ink.btn.buy', l), go: 'buy' },
        ]);
        break;
      case 'buy':
        reply([{ from: 'bot', text: say('ink.ask.search', l) }], [
          { label: say('ink.btn.by.number', l), go: 'number' },
        ]);
        break;
      case 'number':
        reply([{ from: 'bot', text: say('ink.ask.cartridge', l) }], [
          { label: 'TN-730', go: 'toner' },
        ]);
        break;
      case 'toner':
        reply([{ from: 'bot', text: say('ink.result.can.order', l) }], [
          { label: say('ink.btn.callback', l), go: 'callback' },
          { label: say('ink.btn.no.callback', l), go: 'nothanks' },
        ]);
        break;
      case 'callback':
        reply(
          [
            { from: 'bot', text: say('ink.callback.ask.phone', l) },
            { from: 'note', text: t.endCallback },
          ],
          [{ label: t.restart, go: 'start' }]
        );
        break;
      case 'nothanks':
        reply([{ from: 'bot', text: say('menu.prompt', l) }], menu(l));
        break;
      case 'human':
        reply(
          [
            { from: 'bot', text: say('human.handoff', l) },
            { from: 'note', text: t.endHuman },
          ],
          [{ label: t.restart, go: 'start' }]
        );
        break;
    }
  };

  const press = (b: Btn) => {
    setLog((l) => [...l, { from: 'me', text: b.label }]);
    run(b.go, typeof b.go === 'object' ? b.go.lang : lang);
  };

  // Start once, without the typing delay.
  useEffect(() => {
    setLog([
      { from: 'bot', text: say('welcome.intro', 'en') },
      { from: 'bot', text: say('language.prompt', 'en') },
    ]);
    setButtons([
      { label: 'English', go: { lang: 'en' } },
      { label: 'Français', go: { lang: 'fr' } },
      { label: 'فارسی', go: { lang: 'fa' } },
    ]);
    return () => window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, typing]);

  return (
    <div className="chat">
      <div className="chat-head">
        <span>InkPlusBot</span>
        <button type="button" className="textbutton" onClick={() => run('start')}>
          {t.restart}
        </button>
      </div>
      <div className="chat-log" ref={scroller} aria-live="polite">
        {log.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`} dir="auto">
            {m.from === 'note' ? m.text : md(m.text)}
          </div>
        ))}
        {typing && (
          <div className="bubble bot typing" aria-label={t.typing}>
            <span>·</span>
            <span>·</span>
            <span>·</span>
          </div>
        )}
      </div>
      <div className="chat-keys">
        {buttons.map((b) => (
          <button key={b.label} type="button" onClick={() => press(b)} dir="auto">
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
