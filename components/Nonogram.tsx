'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/context';

/* A sailboat. Solvable by line logic alone, with one answer. */
const SOLUTION = [
  '...#...',
  '...##..',
  '...###.',
  '...####',
  '...#...',
  '#######',
  '.#####.',
].map((row) => row.split('').map((c) => c === '#'));

/* 0 = blank, 1 = filled, 2 = marked empty */
type Cell = 0 | 1 | 2;

function runs(line: boolean[]): number[] {
  const out: number[] = [];
  let n = 0;
  for (const on of line) {
    if (on) n++;
    else if (n) {
      out.push(n);
      n = 0;
    }
  }
  if (n) out.push(n);
  return out.length ? out : [0];
}

const SIZE = 7;
const column = (grid: boolean[][], c: number) => grid.map((row) => row[c] ?? false);
const at = (r: number, c: number) => SOLUTION[r]?.[c] ?? false;
const same = (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => v === b[i]);

const ROW_CLUES = SOLUTION.map(runs);
const COL_CLUES = Array.from({ length: SIZE }, (_, c) => runs(column(SOLUTION, c)));

const empty = (): Cell[][] => SOLUTION.map((row) => row.map(() => 0 as Cell));

export default function Nonogram() {
  const { messages } = useLanguage();
  const t = messages.puzzle;
  const [grid, setGrid] = useState<Cell[][]>(empty);
  const [revealed, setRevealed] = useState(false);

  const filled = useMemo(() => grid.map((row) => row.map((v) => v === 1)), [grid]);
  const solved = useMemo(
    () => filled.every((row, r) => row.every((on, c) => on === at(r, c))),
    [filled]
  );
  const rowDone = ROW_CLUES.map((clue, r) => same(runs(filled[r] ?? []), clue));
  const colDone = COL_CLUES.map((clue, c) => same(runs(column(filled, c)), clue));

  const cycle = (r: number, c: number) => {
    if (solved) return;
    setGrid((g) =>
      g.map((row, ri) =>
        ri !== r ? row : row.map((v, ci) => (ci !== c ? v : (((v + 1) % 3) as Cell)))
      )
    );
  };

  const reset = () => {
    setGrid(empty());
    setRevealed(false);
  };

  const reveal = () => {
    setGrid(SOLUTION.map((row) => row.map((on) => (on ? 1 : 0) as Cell)));
    setRevealed(true);
  };

  const stateLabel = (v: Cell) => (v === 1 ? t.filled : v === 2 ? t.marked : t.blank);

  return (
    <div>
      <p className="nono-help">{t.help}</p>
      <div className="nono" role="group" aria-label={t.label}>
        <ol className="nono-cols" aria-label={t.colsLabel}>
          {COL_CLUES.map((clue, c) => (
            <li key={c} className={colDone[c] ? 'done' : undefined}>
              {clue.map((n, i) => (
                <span key={i}>{n}</span>
              ))}
            </li>
          ))}
        </ol>
        <ol className="nono-rows" aria-label={t.rowsLabel}>
          {ROW_CLUES.map((clue, r) => (
            <li key={r} className={rowDone[r] ? 'done' : undefined}>
              {clue.map((n, i) => (
                <span key={i}>{n}</span>
              ))}
            </li>
          ))}
        </ol>
        <div className={`nono-grid${solved ? ' is-solved' : ''}`}>
          {grid.map((row, r) =>
            row.map((v, c) => (
              <button
                key={`${r}-${c}`}
                type="button"
                data-state={v}
                onClick={() => cycle(r, c)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (solved) return;
                  setGrid((g) =>
                    g.map((rw, ri) =>
                      ri !== r ? rw : rw.map((x, ci) => (ci !== c ? x : x === 2 ? 0 : 2))
                    )
                  );
                }}
                aria-label={`${t.cell.replace('{r}', String(r + 1)).replace('{c}', String(c + 1))}: ${stateLabel(v)}`}
              >
                {v === 2 && !solved ? '×' : ''}
              </button>
            ))
          )}
        </div>
      </div>

      <p className="nono-actions" aria-live="polite">
        {solved && <span className="nono-status">{revealed ? t.revealed : t.solved}</span>}
        {!solved && (
          <button type="button" className="textbutton" onClick={reveal}>
            {t.reveal}
          </button>
        )}
        <button type="button" className="textbutton" onClick={reset}>
          {t.clear}
        </button>
      </p>
    </div>
  );
}
