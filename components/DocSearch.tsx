'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { useLanguage } from '@/context';
import { toGregorian, toJalali } from '@/lib/jalali';

/* Made-up documents for a made-up applicant. The real index runs on my own
   files and never leaves my Mac; this copies how it reads and matches. */
type Source = 'ocr' | 'ocrFa' | 'pdf' | 'form';
type Doc = { path: string; source: Source; confidence?: number; text: string };

const DOCS: Doc[] = [
  { path: '2017/Passport p7, exit stamp.jpg', source: 'ocrFa', confidence: 0.71, text: 'مهر خروج ۱۳۹۵/۱۲/۲۸ فرودگاه' },
  { path: '2017/Study permit.pdf', source: 'ocr', confidence: 0.96, text: "STUDY PERMIT / PERMIS D'ÉTUDES. Date issued 2017-03-19. Expiry 2020-08-31. Document no. X000123456." },
  { path: '2017/Flight booking.pdf', source: 'pdf', text: 'Itinerary. Departure March 18, 2017 23:55. Arrival March 19, 2017 07:40.' },
  { path: '2019/IMM 5709 extension.pdf', source: 'form', text: 'Date of original entry to Canada: 2017-03-19. Current status in Canada: Student.' },
  { path: '2017/Bank letter.pdf', source: 'pdf', text: 'Balance as of 18.03.17: CAD 21,400.' },
  { path: '2017/Acceptance letter.pdf', source: 'pdf', text: 'We are pleased to confirm your admission. Your program begins 2017-09-05.' },
  { path: '2017/Lease, photo.jpg', source: 'ocr', confidence: 0.88, text: 'Lease starts 1 Sep 2017 for 12 months. Tenant: A. Sample.' },
  { path: 'ID/National ID card.jpg', source: 'ocrFa', confidence: 0.64, text: 'تاریخ تولد ۱۳۷۸/۰۶/۳۰' },
];

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/* Persian and Arabic digits to 0-9; Arabic yeh and kaf to their Persian forms. */
function normalize(s: string) {
  return s
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)))
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;
const valid = (y: number, m: number, d: number) => m >= 1 && m <= 12 && d >= 1 && d <= 31 && y > 1200;

type Found = { iso: string; at: number; len: number };

/* Every date in a piece of text, in any of the forms the real files use. */
function findDates(raw: string): Found[] {
  const s = normalize(raw);
  const out: Found[] = [];
  const add = (y: number, m: number, d: number, at: number, len: number, jalali = false) => {
    if (jalali) {
      if (!(m >= 1 && m <= 12 && d >= 1 && d <= 31)) return;
      const g = toGregorian(y, m, d);
      out.push({ iso: iso(g.gy, g.gm, g.gd), at, len });
    } else if (valid(y, m, d)) out.push({ iso: iso(y, m, d), at, len });
  };
  for (const m of s.matchAll(/\b(1[34]\d\d)\/(\d{1,2})\/(\d{1,2})\b/g)) add(+m[1]!, +m[2]!, +m[3]!, m.index!, m[0].length, true);
  for (const m of s.matchAll(/\b((?:19|20)\d\d)[-/](\d{1,2})[-/](\d{1,2})\b/g)) add(+m[1]!, +m[2]!, +m[3]!, m.index!, m[0].length);
  for (const m of s.matchAll(/\b(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})\b/g)) {
    const y = m[3]!.length === 2 ? 2000 + +m[3]! : +m[3]!;
    add(y, +m[2]!, +m[1]!, m.index!, m[0].length);
  }
  const mon = MONTHS.map((x) => x.slice(0, 3)).join('|');
  for (const m of s.matchAll(new RegExp(`\\b(${mon})[a-z]*\\.? (\\d{1,2}),? (\\d{4})\\b`, 'g')))
    add(+m[3]!, MONTHS.findIndex((x) => x.startsWith(m[1]!)) + 1, +m[2]!, m.index!, m[0].length);
  for (const m of s.matchAll(new RegExp(`\\b(\\d{1,2}) (${mon})[a-z]*\\.? (\\d{4})\\b`, 'g')))
    add(+m[3]!, MONTHS.findIndex((x) => x.startsWith(m[2]!)) + 1, +m[1]!, m.index!, m[0].length);
  return out;
}

function forms(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map(Number) as [number, number, number];
  const j = toJalali(y, m, d);
  const fa = `${j.jy}/${pad(j.jm)}/${pad(j.jd)}`.replace(/\d/g, (x) => FA_DIGITS[+x]!);
  return [
    isoDate,
    `${pad(d)}.${pad(m)}.${String(y).slice(2)}`,
    `${MONTHS[m - 1]!.charAt(0).toUpperCase()}${MONTHS[m - 1]!.slice(1)} ${d}, ${y}`,
    fa,
  ];
}

function highlight(text: string, spans: { at: number; len: number }[]): ReactNode {
  if (!spans.length) return text;
  const sorted = [...spans].sort((a, b) => a.at - b.at);
  const out: ReactNode[] = [];
  let i = 0;
  sorted.forEach((sp, k) => {
    if (sp.at < i) return;
    out.push(text.slice(i, sp.at));
    out.push(<mark key={k}>{text.slice(sp.at, sp.at + sp.len)}</mark>);
    i = sp.at + sp.len;
  });
  out.push(text.slice(i));
  return out;
}

const EXAMPLES = ['۱۳۹۵/۱۲/۲۸', 'March 19, 2017', '18.03.17', 'study permit', 'تاريخ'];

export default function DocSearch() {
  const { messages } = useLanguage();
  const t = messages.ai.search;
  const [q, setQ] = useState('۱۳۹۵/۱۲/۲۸');

  const result = useMemo(() => {
    const query = q.trim();
    if (!query) return { dates: [] as string[], hits: [] as { doc: Doc; spans: { at: number; len: number }[] }[] };
    const qDates = [...new Set(findDates(query).map((f) => f.iso))];
    const hits: { doc: Doc; spans: { at: number; len: number }[] }[] = [];
    for (const doc of DOCS) {
      let spans: { at: number; len: number }[] = [];
      if (qDates.length) {
        spans = findDates(doc.text).filter((f) => qDates.includes(f.iso));
      } else {
        // NFD only splits accents off Latin letters, so lengths match the
        // original for the scripts used here.
        const words = normalize(query).split(/\s+/).filter(Boolean);
        const hay = normalize(doc.text);
        const found = words.map((w) => ({ at: hay.indexOf(w), len: w.length }));
        if (found.every((f) => f.at >= 0)) spans = found;
      }
      if (spans.length) hits.push({ doc, spans });
    }
    return { dates: qDates, hits };
  }, [q]);

  return (
    <div className="dsearch">
      <label className="dsearch-label" htmlFor="dsearch-q">
        {t.label}
      </label>
      <input
        id="dsearch-q"
        className="dsearch-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        dir="auto"
        spellCheck={false}
        autoComplete="off"
      />
      <p className="dsearch-try">
        {t.try}{' '}
        {EXAMPLES.map((ex, i) => (
          <span key={ex}>
            {i > 0 && ' · '}
            <button type="button" className="textbutton" onClick={() => setQ(ex)} dir="auto">
              {ex}
            </button>
          </span>
        ))}
      </p>

      {result.dates.length > 0 && (
        <p className="dsearch-as">
          {t.readAs}{' '}
          {result.dates.map((d) => (
            <span key={d}>
              {forms(d).map((f, i) => (
                <span key={f}>
                  {i > 0 && <span aria-hidden="true"> = </span>}
                  <code dir="auto">{f}</code>
                </span>
              ))}
            </span>
          ))}
        </p>
      )}

      <p className="dsearch-count" aria-live="polite">
        <strong>{result.hits.length}</strong> / {DOCS.length} {t.files}
      </p>
      <ol className="dsearch-hits">
        {result.hits.map(({ doc, spans }) => (
          <li key={doc.path}>
            <p className="dsearch-path">{doc.path}</p>
            <p className="dsearch-text" dir="auto">
              {highlight(doc.text, spans)}
            </p>
            <p className="dsearch-meta">
              {t.sources[doc.source]}
              {doc.confidence !== undefined && (
                <>
                  {' · '}
                  <span className={doc.confidence < 0.8 ? 'low' : undefined}>
                    {t.confidence} {Math.round(doc.confidence * 100)}%
                    {doc.confidence < 0.8 ? `, ${t.checkOriginal}` : ''}
                  </span>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
