"use client";

import { useMemo, useState } from "react";
import { useRoll } from "@/lib/use-roll";
import { wordCategories, type CategoryId } from "@/lib/words";
import { ChoiceChips } from "./choice-chips";
import { KeyHint, RollButton, RoundPanel, Toggle } from "./game-controls";

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
    <div className="flex flex-col items-center">
      <ChoiceChips
        legend="Draw from"
        name="category"
        options={choices}
        value={choice}
        onChange={setChoice}
        className="mb-10"
      />

      <div
        data-rolling={rolling}
        className="piece relative grid min-h-56 w-full max-w-136 place-items-center rounded-[1.75rem] bg-bubblegum px-6 py-12 text-center"
      >
        {result && !rolling && (
          <span className="absolute top-4 left-5 text-sm font-semibold text-ink/70">
            {categoryOf.get(result)}
          </span>
        )}
        <span
          key={rolls}
          aria-hidden
          className={`font-display text-[clamp(2.25rem,9vw,3.75rem)] leading-[1.05] text-balance ${rolling ? "" : "land"}`}
        >
          {shown ?? "?"}
        </span>
      </div>
      <p aria-live="polite" className="sr-only">
        {result ? `Draw ${rolls}: ${result}, ${categoryOf.get(result)}` : ""}
      </p>

      <RollButton onClick={roll} disabled={rolling || usedUp} className="mt-12">
        Draw a word
      </RollButton>
      {usedUp ? (
        <p className="mt-5 max-w-sm text-center text-paper/85">
          {choice === "any"
            ? "Every word has been drawn. Start a new round to use them again."
            : `Every word in ${choiceLabel} has been drawn. Pick another category or start a new round.`}
        </p>
      ) : (
        <KeyHint>Or press Space</KeyHint>
      )}

      <RoundPanel
        history={history}
        emptyText="Words you draw show up here."
        onReset={reset}
        renderItem={(word) => (
          <span className="block rounded-full bg-bubblegum px-3 py-1 font-semibold text-ink">
            {word}
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
