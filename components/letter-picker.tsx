"use client";

import { useMemo, useState } from "react";
import { useRoll } from "@/lib/use-roll";
import { RollButton, RollNote, RoundStrip, Toggle } from "./game-controls";
import { GameScreen } from "./game-screen";

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
    <GameScreen
      title="Random letter"
      appTitle="Letter"
      options={
        <div className="divide-y divide-paper/10">
          <Toggle checked={noRepeats} onChange={setNoRepeats}>
            No repeats this round
          </Toggle>
          <Toggle checked={skipHard} onChange={setSkipHard}>
            Skip hard letters ({HARD_LETTERS.join(", ")})
          </Toggle>
        </div>
      }
      round={(panelOptions) => (
        <RoundStrip
          history={history}
          emptyText="Letters you roll show up here."
          onReset={reset}
          options={panelOptions}
          renderItem={(letter) => (
            <span className="piece grid size-9 place-items-center rounded-lg bg-butter font-display [--depth:3px] desktop:size-10 desktop:text-lg">
              {letter}
            </span>
          )}
        />
      )}
      action={
        <>
          <RollButton onClick={roll} disabled={rolling || usedUp}>
            Roll a letter
          </RollButton>
          {usedUp ? (
            <RollNote>Every letter has been used. Start a new round to use them again.</RollNote>
          ) : (
            <RollNote keyboardOnly>Or press Space</RollNote>
          )}
        </>
      }
    >
      <div
        data-rolling={rolling}
        className="piece @container grid size-[min(68vw,36dvh,17rem)] place-items-center rounded-[18%] bg-butter tablet:size-[min(46vw,40dvh,22rem)] desktop:size-68"
      >
        <span
          key={rolls}
          aria-hidden
          className={`font-display text-[62cqw] leading-none ${rolling ? "" : "land"}`}
        >
          {shown ?? "?"}
        </span>
      </div>
      <p aria-live="polite" className="sr-only">
        {result ? `Roll ${rolls}: letter ${result}` : ""}
      </p>
    </GameScreen>
  );
}
