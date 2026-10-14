"use client";

import { useMemo, useState } from "react";
import { useRoll } from "@/lib/use-roll";
import { KeyHint, RollButton, RoundPanel, Toggle } from "./game-controls";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const HARD_LETTERS = ["Q", "X", "Y", "Z"];

export function LetterPicker() {
  const [noRepeats, setNoRepeats] = useState(true);
  const [skipHard, setSkipHard] = useState(false);

  const pool = useMemo(
    () => (skipHard ? ALPHABET.filter((l) => !HARD_LETTERS.includes(l)) : ALPHABET),
    [skipHard],
  );
  const { shown, result, rolling, rolls, history, available, roll, reset } = useRoll(pool, {
    noRepeats,
  });
  const usedUp = available.length === 0;

  return (
    <div className="flex flex-col items-center">
      <div
        data-rolling={rolling}
        className="piece grid size-[min(70vw,17rem)] place-items-center rounded-[18%] bg-butter"
      >
        <span
          key={rolls}
          aria-hidden
          className={`font-display text-[min(42vw,10rem)] leading-none ${rolling ? "" : "land"}`}
        >
          {shown ?? "?"}
        </span>
      </div>
      <p aria-live="polite" className="sr-only">
        {result ? `Roll ${rolls}: letter ${result}` : ""}
      </p>

      <RollButton onClick={roll} disabled={rolling || usedUp} className="mt-12">
        Roll a letter
      </RollButton>
      {usedUp ? (
        <p className="mt-5 max-w-sm text-center text-paper/85">
          Every letter has been used. Start a new round to use them again.
        </p>
      ) : (
        <KeyHint>Or press Space</KeyHint>
      )}

      <RoundPanel
        history={history}
        emptyText="Letters you roll show up here."
        onReset={reset}
        renderItem={(letter) => (
          <span className="piece grid size-10 place-items-center rounded-lg bg-butter font-display text-lg [--depth:3px]">
            {letter}
          </span>
        )}
      >
        <Toggle checked={noRepeats} onChange={setNoRepeats}>
          No repeats this round
        </Toggle>
        <Toggle checked={skipHard} onChange={setSkipHard}>
          Skip hard letters ({HARD_LETTERS.join(", ")})
        </Toggle>
      </RoundPanel>
    </div>
  );
}
