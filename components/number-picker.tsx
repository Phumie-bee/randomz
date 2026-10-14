"use client";

import { useMemo, useState } from "react";
import { useRoll } from "@/lib/use-roll";
import { KeyHint, RollButton, RoundPanel, Toggle } from "./game-controls";

const LIMIT = 999_999;
const MAX_RANGE = 10_000;

const presets = [
  { from: 1, to: 6 },
  { from: 1, to: 10 },
  { from: 1, to: 100 },
];

type Range =
  | { ok: true; lo: number; hi: number; pool: string[] }
  | { ok: false; error: string; pool: string[] };

function parseRange(from: string, to: string): Range {
  const a = Number(from);
  const b = Number(to);
  if (from.trim() === "" || to.trim() === "" || !Number.isInteger(a) || !Number.isInteger(b)) {
    return { ok: false, error: "Enter a whole number in both boxes.", pool: [] };
  }
  if (Math.abs(a) > LIMIT || Math.abs(b) > LIMIT) {
    return { ok: false, error: "Use numbers between -999,999 and 999,999.", pool: [] };
  }
  // Accept the range either way round.
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  if (hi - lo + 1 > MAX_RANGE) {
    return { ok: false, error: "Pick a range of 10,000 numbers or fewer.", pool: [] };
  }
  return { ok: true, lo, hi, pool: Array.from({ length: hi - lo + 1 }, (_, i) => String(lo + i)) };
}

// Longer numbers get a smaller size so they fit inside the token.
function sizeFor(text: string) {
  if (text.length <= 2) return "text-[min(32vw,7.5rem)]";
  if (text.length === 3) return "text-[min(22vw,5.25rem)]";
  if (text.length === 4) return "text-[min(17vw,4rem)]";
  if (text.length === 5) return "text-[min(13vw,3.25rem)]";
  return "text-[min(10vw,2.5rem)]";
}

export function NumberPicker() {
  const [from, setFrom] = useState("1");
  const [to, setTo] = useState("100");
  const [noRepeats, setNoRepeats] = useState(false);

  const range = useMemo(() => parseRange(from, to), [from, to]);
  const { shown, result, rolling, rolls, history, available, roll, reset } = useRoll(range.pool, {
    noRepeats,
  });
  const usedUp = range.ok && available.length === 0;
  const text = shown ?? "?";

  return (
    <div className="flex flex-col items-center">
      <div className="mb-10 flex flex-col items-center">
        <div className="flex justify-center gap-4">
          <label className="flex flex-col items-center gap-2 font-semibold text-paper/85">
            From
            <input
              type="number"
              inputMode="numeric"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-invalid={!range.ok}
              aria-describedby="range-error"
              className="w-32 rounded-2xl bg-paper px-3 py-2 text-center font-display text-2xl text-ink"
            />
          </label>
          <label className="flex flex-col items-center gap-2 font-semibold text-paper/85">
            To
            <input
              type="number"
              inputMode="numeric"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              aria-invalid={!range.ok}
              aria-describedby="range-error"
              className="w-32 rounded-2xl bg-paper px-3 py-2 text-center font-display text-2xl text-ink"
            />
          </label>
        </div>

        <p id="range-error" className="mt-3 min-h-6 text-center font-semibold text-butter">
          {range.ok ? "" : range.error}
        </p>

        <div role="group" aria-label="Quick ranges" className="mt-1 flex flex-wrap justify-center gap-2">
          {presets.map((p) => (
            <button
              key={p.to}
              type="button"
              aria-pressed={from === String(p.from) && to === String(p.to)}
              onClick={() => {
                setFrom(String(p.from));
                setTo(String(p.to));
              }}
              className="rounded-full border-2 border-paper/40 px-4 py-1.5 font-semibold hover:border-paper aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-ink"
            >
              {p.from} to {p.to}
            </button>
          ))}
        </div>
      </div>

      <div
        data-rolling={rolling}
        className="piece grid size-[min(70vw,17rem)] place-items-center rounded-full bg-mint"
      >
        <span
          key={rolls}
          aria-hidden
          className={`font-display leading-none tabular-nums ${sizeFor(text)} ${rolling ? "" : "land"}`}
        >
          {text}
        </span>
      </div>
      <p aria-live="polite" className="sr-only">
        {result ? `Pick ${rolls}: ${result}` : ""}
      </p>

      <RollButton onClick={roll} disabled={rolling || !range.ok || usedUp} className="mt-12">
        Pick a number
      </RollButton>
      {usedUp ? (
        <p className="mt-5 max-w-sm text-center text-paper/85">
          Every number from {range.lo} to {range.hi} has been picked. Start a new round to use
          them again.
        </p>
      ) : (
        <KeyHint>Or press Space</KeyHint>
      )}

      <RoundPanel
        history={history}
        emptyText="Numbers you pick show up here."
        onReset={reset}
        renderItem={(n) => (
          <span className="block rounded-full bg-mint px-3 py-1 font-semibold text-ink tabular-nums">
            {n}
          </span>
        )}
      >
        <Toggle checked={noRepeats} onChange={setNoRepeats}>
          No repeats this round
        </Toggle>
      </RoundPanel>
    </div>
  );
}
