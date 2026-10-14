"use client";

import { useMemo, useState } from "react";
import { useRoll } from "@/lib/use-roll";
import { wordCategories, type CategoryId } from "@/lib/words";
import { ChoiceChips } from "./choice-chips";
import { RollButton, RollNote, RoundStrip, SettingsButton, Toggle } from "./game-controls";
import { GameScreen } from "./game-screen";
import { Sheet } from "./sheet";

type Choice = CategoryId | "any";

const categoryOf = new Map<string, string>(
  wordCategories.flatMap((c) => c.words.map((w) => [w, c.label] as const)),
);

const choices: { value: Choice; label: string }[] = [
  { value: "any", label: "Any" },
  ...wordCategories.map((c) => ({ value: c.id, label: c.label })),
];

export function WordPicker() {
  const [choice, setChoice] = useState<Choice>("any");
  const [noRepeats, setNoRepeats] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const pool = useMemo<string[]>(
    () =>
      choice === "any"
        ? wordCategories.flatMap((c) => c.words)
        : [...wordCategories.find((c) => c.id === choice)!.words],
    [choice],
  );
  const { shown, result, rolling, rolls, history, available, roll, reset } = useRoll(pool, {
    noRepeats,
  });
  const usedUp = available.length === 0;
  const choiceLabel = choices.find((c) => c.value === choice)!.label;

  return (
    <>
      <GameScreen
        title="Word"
        action={<SettingsButton onClick={() => setSettingsOpen(true)} />}
        controls={
          <ChoiceChips
            legend="Draw from"
            name="category"
            options={choices}
            value={choice}
            onChange={setChoice}
          />
        }
        footer={
          <>
            <RoundStrip
              history={history}
              emptyText="Words you draw show up here."
              onReset={reset}
              renderItem={(word) => (
                <span className="block rounded-full bg-bubblegum px-3 py-1.5 font-semibold whitespace-nowrap text-ink">
                  {word}
                </span>
              )}
            />
            <RollButton onClick={roll} disabled={rolling || usedUp}>
              Draw a word
            </RollButton>
            {usedUp ? (
              <RollNote>
                {choice === "any"
                  ? "Every word has been drawn. Tap New round to use them again."
                  : `Every word in ${choiceLabel} has been drawn. Pick another category or tap New round.`}
              </RollNote>
            ) : (
              <RollNote keyboardOnly>Or press Space</RollNote>
            )}
          </>
        }
      >
        <div
          data-rolling={rolling}
          className="piece relative grid min-h-[min(34dvh,15rem)] w-full place-items-center rounded-[1.75rem] bg-bubblegum px-5 py-10 text-center"
        >
          {result && !rolling && (
            <span className="absolute top-4 left-5 text-sm font-semibold text-ink/70">
              {categoryOf.get(result)}
            </span>
          )}
          <span
            key={rolls}
            aria-hidden
            className={`font-display text-[clamp(2rem,10vw,3rem)] leading-[1.05] text-balance ${rolling ? "" : "land"}`}
          >
            {shown ?? "?"}
          </span>
        </div>
        <p aria-live="polite" className="sr-only">
          {result ? `Draw ${rolls}: ${result}, ${categoryOf.get(result)}` : ""}
        </p>
      </GameScreen>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Settings">
        <Toggle checked={noRepeats} onChange={setNoRepeats}>
          No repeats this round
        </Toggle>
      </Sheet>
    </>
  );
}
