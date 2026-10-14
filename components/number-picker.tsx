"use client";

import { useMemo, useState } from "react";
import { useRoll } from "@/lib/use-roll";
import { chipClass } from "./choice-chips";
import { RollButton, RollNote, RoundStrip, SettingsButton, Toggle } from "./game-controls";
import { GameScreen } from "./game-screen";
import { Sheet } from "./sheet";

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

// Longer numbers get a smaller size (relative to the token) so they fit inside it.
function sizeFor(text: string) {
  if (text.length <= 2) return "text-[48cqw]";
  if (text.length === 3) return "text-[36cqw]";
  if (text.length === 4) return "text-[27cqw]";
  if (text.length === 5) return "text-[21cqw]";
  return "text-[17cqw]";
}

const inputClass =
  "mt-1.5 w-full rounded-2xl bg-paper px-3 py-2.5 text-center font-display text-2xl text-ink";

export function NumberPicker() {
  const [from, setFrom] = useState("1");
  const [to, setTo] = useState("100");
  const [noRepeats, setNoRepeats] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const range = useMemo(() => parseRange(from, to), [from, to]);
  const { shown, result, rolling, rolls, history, available, roll, reset } = useRoll(range.pool, {
    noRepeats,
  });
  const usedUp = range.ok && available.length === 0;
  const text = shown ?? "?";
  const isPreset = presets.some((p) => from === String(p.from) && to === String(p.to));

  return (
    <>
      <GameScreen
        title="Number"
        action={<SettingsButton onClick={() => setSettingsOpen(true)} />}
        controls={
          <div role="group" aria-labelledby="range-label">
            <p id="range-label" className="mb-2 text-sm font-semibold text-paper/75">
              Range
            </p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 scrollbar-none">
              {presets.map((p) => (
                <button
                  key={p.to}
                  type="button"
                  aria-pressed={from === String(p.from) && to === String(p.to)}
                  onClick={() => {
                    setFrom(String(p.from));
                    setTo(String(p.to));
                  }}
                  className={chipClass}
                >
                  {p.from} to {p.to}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={!isPreset}
                onClick={() => setSettingsOpen(true)}
                className={chipClass}
              >
                {!isPreset && range.ok ? `${range.lo} to ${range.hi}` : "Custom"}
              </button>
            </div>
          </div>
        }
        footer={
          <>
            <RoundStrip
              history={history}
              emptyText="Numbers you pick show up here."
              onReset={reset}
              renderItem={(n) => (
                <span className="block rounded-full bg-mint px-3 py-1.5 font-semibold text-ink tabular-nums">
                  {n}
                </span>
              )}
            />
            <RollButton onClick={roll} disabled={rolling || !range.ok || usedUp}>
              Pick a number
            </RollButton>
            {!range.ok ? (
              <RollNote>{range.error} Tap Custom to fix it.</RollNote>
            ) : usedUp ? (
              <RollNote>
                Every number from {range.lo} to {range.hi} has been picked. Tap New round to use
                them again.
              </RollNote>
            ) : (
              <RollNote keyboardOnly>Or press Space</RollNote>
            )}
          </>
        }
      >
        <div
          data-rolling={rolling}
          className="piece @container grid size-[min(68vw,36dvh,17rem)] place-items-center rounded-full bg-mint"
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
      </GameScreen>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
        <fieldset>
          <legend className="text-sm font-semibold text-paper/75">Range</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label className="font-semibold">
              From
              <input
                type="number"
                inputMode="numeric"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                aria-invalid={!range.ok}
                aria-describedby="range-error"
                className={inputClass}
              />
            </label>
            <label className="font-semibold">
              To
              <input
                type="number"
                inputMode="numeric"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                aria-invalid={!range.ok}
                aria-describedby="range-error"
                className={inputClass}
              />
            </label>
          </div>
          <p id="range-error" className="mt-2 min-h-6 text-sm font-semibold text-butter">
            {range.ok ? "" : range.error}
          </p>
        </fieldset>
        <div className="mt-2 border-t border-paper/10">
          <Toggle checked={noRepeats} onChange={setNoRepeats}>
            No repeats this round
          </Toggle>
        </div>
      </Sheet>
    </>
  );
}
