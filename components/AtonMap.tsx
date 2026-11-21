'use client';

import { useMemo, useRef, useState, type PointerEvent } from 'react';
import { useLanguage } from '@/context';

/* A made-up channel with made-up buoys, drawn like a nautical chart.
   The three query shapes match the ones ATONIS's GraphQL API answers:
   bounding box, distance from a point, and polygon intersection. */

const W = 640;
const H = 400;
const LON0 = -75.76;
const LON1 = -75.64;
const LAT0 = 45.445; // top
const LAT1 = 45.405; // bottom
const M_PER_DEG_LAT = 110540;
const M_PER_DEG_LON = 111320 * Math.cos((45.425 * Math.PI) / 180);

type Kind = 'port' | 'starboard' | 'southCardinal' | 'isolatedDanger' | 'special' | 'light';
type Aid = { id: string; kind: Kind; x: number; y: number };

/* Canada uses IALA region B: red right returning, so going upstream (east)
   the red cones are on the south side and the green cans on the north. */
const AIDS: Aid[] = [
  { id: 'A1', kind: 'port', x: 63, y: 241 },
  { id: 'A2', kind: 'starboard', x: 77, y: 309 },
  { id: 'A3', kind: 'port', x: 173, y: 217 },
  { id: 'A4', kind: 'starboard', x: 187, y: 285 },
  { id: 'A5', kind: 'port', x: 293, y: 190 },
  { id: 'A6', kind: 'starboard', x: 307, y: 259 },
  { id: 'A7', kind: 'port', x: 413, y: 164 },
  { id: 'A8', kind: 'starboard', x: 427, y: 232 },
  { id: 'A9', kind: 'port', x: 533, y: 138 },
  { id: 'A10', kind: 'starboard', x: 547, y: 206 },
  { id: 'S1', kind: 'southCardinal', x: 245, y: 226 },
  { id: 'D1', kind: 'isolatedDanger', x: 355, y: 158 },
  { id: 'Y1', kind: 'special', x: 132, y: 322 },
  { id: 'L1', kind: 'light', x: 600, y: 112 },
];

type Pt = { x: number; y: number };
type Mode = 'box' | 'near' | 'area';

const lon = (x: number) => LON0 + (x / W) * (LON1 - LON0);
const lat = (y: number) => LAT0 + (y / H) * (LAT1 - LAT0);
const ll = (p: Pt): [number, number] => [+lon(p.x).toFixed(4), +lat(p.y).toFixed(4)];
const metres = (a: Pt, b: Pt) =>
  Math.hypot((lon(a.x) - lon(b.x)) * M_PER_DEG_LON, (lat(a.y) - lat(b.y)) * M_PER_DEG_LAT);
const PX_PER_KM = 1000 / (((LON1 - LON0) / W) * M_PER_DEG_LON);

function inside(p: Pt, ring: Pt[]) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i]!;
    const b = ring[j]!;
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) hit = !hit;
  }
  return hit;
}

/* Signed area in lon/lat (y up). Negative = clockwise. */
function clockwise(ring: Pt[]) {
  let s = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ll(ring[i]!);
    const [x2, y2] = ll(ring[(i + 1) % ring.length]!);
    s += x1 * y2 - x2 * y1;
  }
  return s < 0;
}

const EXAMPLE_BOX = { a: { x: 250, y: 140 }, b: { x: 450, y: 270 } };
/* Drawn clockwise on purpose, around the middle of the channel. */
const EXAMPLE_RING: Pt[] = [
  { x: 150, y: 200 },
  { x: 330, y: 150 },
  { x: 350, y: 280 },
  { x: 170, y: 320 },
];

function Symbol({ kind, on }: { kind: Kind; on: boolean }) {
  const ring = on ? <circle r="11" className="aid-hit" /> : null;
  switch (kind) {
    case 'starboard':
      return (
        <>
          {ring}
          <path d="M0 -7 L6 5 L-6 5 Z" className="aid-red" />
        </>
      );
    case 'port':
      return (
        <>
          {ring}
          <rect x="-5" y="-5" width="10" height="10" className="aid-green" />
        </>
      );
    case 'southCardinal':
      return (
        <>
          {ring}
          <rect x="-5" y="-6" width="10" height="6" className="aid-yellow" />
          <rect x="-5" y="0" width="10" height="6" className="aid-black" />
          <path d="M-4 -13 L4 -13 L0 -8 Z M-4 -19 L4 -19 L0 -14 Z" className="aid-black" />
        </>
      );
    case 'isolatedDanger':
      return (
        <>
          {ring}
          <rect x="-5" y="-6" width="10" height="12" className="aid-black" />
          <rect x="-5" y="-2" width="10" height="4" className="aid-red" />
          <circle cy="-10" r="2" className="aid-black" />
          <circle cy="-15" r="2" className="aid-black" />
        </>
      );
    case 'special':
      return (
        <>
          {ring}
          <circle r="5.5" className="aid-yellow" />
          <path d="M-3 -11 L3 -5 M3 -11 L-3 -5" className="aid-x" />
        </>
      );
    case 'light':
      return (
        <>
          {ring}
          <circle r="2.5" className="aid-black" />
          <path d="M2 -2 C8 -10 14 -12 15 -9 C15 -6 10 -3 2 -2 Z" className="aid-flare" />
        </>
      );
  }
}

export default function AtonMap() {
  const { messages } = useLanguage();
  const t = messages.aton;
  const svg = useRef<SVGSVGElement>(null);
  const [mode, setMode] = useState<Mode>('box');
  const [box, setBox] = useState<{ a: Pt; b: Pt } | null>(EXAMPLE_BOX);
  const [center, setCenter] = useState<Pt | null>({ x: 320, y: 220 });
  const [radius, setRadius] = useState(900);
  const [ring, setRing] = useState<Pt[]>([]);
  const [closed, setClosed] = useState(false);
  const [fix, setFix] = useState(true);
  const [tab, setTab] = useState<'req' | 'res'>('res');
  const [hover, setHover] = useState<Aid | null>(null);
  const drag = useRef<Pt | null>(null);

  const toSvg = (e: PointerEvent): Pt => {
    const el = svg.current!;
    const pt = el.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(el.getScreenCTM()!.inverse());
    return { x: Math.max(0, Math.min(W, p.x)), y: Math.max(0, Math.min(H, p.y)) };
  };

  const onDown = (e: PointerEvent<SVGSVGElement>) => {
    const p = toSvg(e);
    if (mode === 'box') {
      drag.current = p;
      setBox({ a: p, b: p });
      (e.target as Element).setPointerCapture?.(e.pointerId);
    } else if (mode === 'near') {
      setCenter(p);
    } else {
      if (closed) {
        setRing([p]);
        setClosed(false);
        return;
      }
      const first = ring[0];
      if (first && ring.length >= 3 && Math.hypot(first.x - p.x, first.y - p.y) < 14) {
        setClosed(true);
      } else {
        setRing((r) => [...r, p]);
      }
    }
  };

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (mode === 'box' && drag.current) setBox({ a: drag.current, b: toSvg(e) });
  };

  const onUp = () => {
    drag.current = null;
  };

  const ccw = closed && ring.length >= 3 ? !clockwise(ring) : true;
  const inverted = closed && !ccw && !fix;
  const sentRing = closed && !ccw && fix ? [...ring].reverse() : ring;

  const selected = useMemo(() => {
    const ids = new Set<string>();
    for (const aid of AIDS) {
      let hit = false;
      if (mode === 'box' && box) {
        const x0 = Math.min(box.a.x, box.b.x);
        const x1 = Math.max(box.a.x, box.b.x);
        const y0 = Math.min(box.a.y, box.b.y);
        const y1 = Math.max(box.a.y, box.b.y);
        hit = aid.x >= x0 && aid.x <= x1 && aid.y >= y0 && aid.y <= y1;
      } else if (mode === 'near' && center) {
        hit = metres(aid, center) <= radius;
      } else if (mode === 'area' && closed && ring.length >= 3) {
        hit = inside(aid, ring) !== inverted;
      }
      if (hit) ids.add(aid.id);
    }
    return ids;
  }, [mode, box, center, radius, ring, closed, inverted]);

  const kindName = (k: Kind) => t.kinds[k];

  const request = useMemo(() => {
    const fmt = (p: [number, number]) => `[${p[0]}, ${p[1]}]`;
    let filter = '';
    if (mode === 'box' && box) {
      const x0 = Math.min(box.a.x, box.b.x);
      const x1 = Math.max(box.a.x, box.b.x);
      const y0 = Math.min(box.a.y, box.b.y);
      const y1 = Math.max(box.a.y, box.b.y);
      const corners: Pt[] = [
        { x: x0, y: y1 },
        { x: x1, y: y1 },
        { x: x1, y: y0 },
        { x: x0, y: y0 },
        { x: x0, y: y1 },
      ];
      filter = `intersects: { geometry: {\n        type: Polygon\n        coordinates: [[${corners.map((c) => fmt(ll(c))).join(', ')}]]\n      } }`;
    } else if (mode === 'near' && center) {
      filter = `distance: {\n        geometry: { type: Point, coordinates: ${fmt(ll(center))} }\n        lte: ${radius}\n      }`;
    } else if (mode === 'area' && closed) {
      const pts = [...sentRing, sentRing[0]!].map((p) => fmt(ll(p)));
      filter = `intersects: { geometry: {\n        type: Polygon\n        coordinates: [[${pts.join(', ')}]]\n      } }`;
    } else {
      return `# ${t.drawFirst}`;
    }
    return `query {\n  aidsToNavigation(\n    where: { geometry: {\n      ${filter}\n    } }\n  ) {\n    nodes { id type geometry }\n  }\n}`;
  }, [mode, box, center, radius, closed, sentRing, t.drawFirst]);

  const response = useMemo(() => {
    const feats = AIDS.filter((a) => selected.has(a.id));
    const shown = feats.slice(0, 3).map(
      (a) =>
        `    {\n      "type": "Feature",\n      "geometry": { "type": "Point", "coordinates": [${ll(a).join(', ')}] },\n      "properties": { "id": "${a.id}", "type": "${kindName(a.kind)}" }\n    }`
    );
    const more = feats.length > 3 ? `,\n    // … ${feats.length - 3} ${t.more}` : '';
    return `{\n  "type": "FeatureCollection",\n  "features": [${shown.length ? '\n' + shown.join(',\n') + more + '\n  ' : ''}]\n}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, t]);

  const setModeAndReset = (m: Mode) => {
    setMode(m);
    if (m === 'area' && !closed) setRing([]);
  };

  const ringPath = (r: Pt[]) => r.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');

  return (
    <div className="aton">
      <div className="aton-modes" role="group" aria-label={t.modesLabel}>
        {(['box', 'near', 'area'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setModeAndReset(m)}
          >
            {t.modes[m]}
          </button>
        ))}
      </div>
      <p className="aton-help">{t.help[mode]}</p>

      <div className="aton-chart">
        <svg
          ref={svg}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={t.chartLabel}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        >
          <rect width={W} height={H} className="water" />
          {/* depth contours */}
          <path d="M0 232 C120 210 200 200 320 172 C440 145 540 125 640 96" className="contour" />
          <path d="M0 338 C120 330 220 318 330 288 C440 262 540 262 640 248" className="contour" />
          <path d="M0 290 L640 150" className="track" />
          {/* land */}
          <path
            d="M0 0 H640 V70 C560 90 520 60 470 95 C420 130 380 110 330 140 C280 170 230 150 180 175 C130 200 80 185 0 215 Z"
            className="land"
          />
          <path
            d="M0 400 H640 V230 C590 250 560 290 500 300 C440 310 410 280 350 300 C290 320 250 350 190 345 C130 340 90 370 0 360 Z"
            className="land"
          />
          <path
            d="M215 190 C225 178 255 176 268 186 C276 195 262 206 242 206 C225 206 208 200 215 190 Z"
            className="land"
          />
          <text x="630" y="40" className="chart-label" textAnchor="end">{t.northShore}</text>
          <text x="40" y="385" className="chart-label">{t.southShore}</text>
          <text x="470" y="190" className="chart-label flow" transform="rotate(-12 470 190)">
            {t.upstream} →
          </text>

          {/* query shapes */}
          {mode === 'box' && box && (
            <rect
              x={Math.min(box.a.x, box.b.x)}
              y={Math.min(box.a.y, box.b.y)}
              width={Math.abs(box.a.x - box.b.x)}
              height={Math.abs(box.a.y - box.b.y)}
              className="query"
            />
          )}
          {mode === 'near' && center && (
            <>
              <circle cx={center.x} cy={center.y} r={(radius / 1000) * PX_PER_KM} className="query" />
              <circle cx={center.x} cy={center.y} r="3" className="query-dot" />
            </>
          )}
          {mode === 'area' && ring.length > 0 && (
            <>
              {closed && inverted && (
                <path
                  d={`M0 0 H${W} V${H} H0 Z ${ringPath(ring)} Z`}
                  fillRule="evenodd"
                  className="query inverted"
                />
              )}
              <path
                d={ringPath(ring) + (closed ? ' Z' : '')}
                className={closed ? (inverted ? 'query-line' : 'query') : 'query-line'}
              />
              {ring.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={i === 0 && !closed ? 6 : 3} className="query-dot" />
              ))}
            </>
          )}

          {AIDS.map((a) => (
            <g
              key={a.id}
              transform={`translate(${a.x} ${a.y})`}
              className={selected.has(a.id) ? 'aid on' : 'aid'}
              onPointerEnter={() => setHover(a)}
              onPointerLeave={() => setHover(null)}
            >
              <g className="aid-sym">
                <Symbol kind={a.kind} on={selected.has(a.id)} />
                <text x="9" y="14" className="aid-id">{a.id}</text>
              </g>
            </g>
          ))}

          {/* scale bar */}
          <g transform={`translate(${W - 20 - PX_PER_KM} ${H - 18})`}>
            <path d={`M0 0 H${PX_PER_KM}`} className="scale" />
            <text x={PX_PER_KM / 2} y="-5" className="chart-label" textAnchor="middle">1 km</text>
          </g>
        </svg>
        {hover && (
          <p className="aton-hover">
            <strong>{hover.id}</strong> · {kindName(hover.kind)} · {ll(hover)[1]}, {ll(hover)[0]}
          </p>
        )}
      </div>

      <div className="aton-controls">
        {mode === 'near' && (
          <label className="aton-range">
            {t.radius}: {radius} m
            <input
              type="range"
              min={200}
              max={2500}
              step={50}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
          </label>
        )}
        {mode === 'area' && (
          <>
            <label className="aton-check">
              <input type="checkbox" checked={fix} onChange={(e) => setFix(e.target.checked)} />
              <code>EnsureCounterClockwise()</code>
            </label>
            <button
              type="button"
              className="textbutton"
              onClick={() => {
                setRing(EXAMPLE_RING);
                setClosed(true);
              }}
            >
              {t.exampleRing}
            </button>
            {ring.length >= 3 && !closed && (
              <button type="button" className="textbutton" onClick={() => setClosed(true)}>
                {t.close}
              </button>
            )}
            {ring.length > 0 && (
              <button
                type="button"
                className="textbutton"
                onClick={() => {
                  setRing([]);
                  setClosed(false);
                }}
              >
                {t.clear}
              </button>
            )}
          </>
        )}
      </div>

      <p className="aton-result" aria-live="polite">
        <strong>
          {selected.size} / {AIDS.length}
        </strong>{' '}
        {t.matched}
        {closed && !ccw && (
          <span className={inverted ? 'aton-warn' : 'aton-ok'}>
            {' '}
            {inverted ? t.windingBug : t.windingFixed}
          </span>
        )}
      </p>

      <div className="aton-code">
        <div className="aton-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'req'} onClick={() => setTab('req')}>
            {t.request}
          </button>
          <button type="button" role="tab" aria-selected={tab === 'res'} onClick={() => setTab('res')}>
            {t.response}
          </button>
        </div>
        <pre className="tree" role="tabpanel">
          {tab === 'req' ? request : response}
        </pre>
      </div>

      <ul className="aton-legend">
        {(['starboard', 'port', 'southCardinal', 'isolatedDanger', 'special', 'light'] as Kind[]).map((k) => (
          <li key={k}>
            <svg viewBox="-12 -20 24 30" width="18" height="22" aria-hidden="true">
              <Symbol kind={k} on={false} />
            </svg>
            {kindName(k)}
          </li>
        ))}
      </ul>
    </div>
  );
}
