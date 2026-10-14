"use client";

import { useState } from "react";
import { randomInt } from "@/lib/random";
import { useRollAnimation } from "@/lib/use-roll";
import { ChoiceChips } from "./choice-chips";
import { Die } from "./die";
import { KeyHint, RollButton, RoundPanel } from "./game-controls";

const counts = [1, 2, 3, 4, 5, 6].map((n) => ({ value: n, label: String(n) }));

function rollDice(count: number) {
  return Array.from({ length: count }, () => randomInt(6) + 1);
}

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

export function DicePicker() {
  const [count, setCount] = useState(2);
  const [result, setResult] = useState<number[] | null>(null);
  const [history, setHistory] = useState<number[][]>([]);
  const [rolls, setRolls] = useState(0);
  const { flicker, rolling, animate, stop } = useRollAnimation<number[]>(() => roll());

  function roll() {
    if (rolling) return;
    const pick = rollDice(count);
    animate(
      () => rollDice(count),
      () => {
        setResult(pick);
        setHistory((h) => [...h, pick]);
        setRolls((n) => n + 1);
      },
    );
  }

  function changeCount(n: number) {
    stop();
    setCount(n);
    setResult(null);
  }

  function reset() {
    stop();
    setResult(null);
    setHistory([]);
  }

  const shown = flicker ?? result;

  return (
    <div className="flex flex-col items-center">
      <ChoiceChips
        legend="How many dice"
        name="count"
        options={counts}
        value={count}
        onChange={changeCount}
        className="mb-10"
      />

      <div className="flex max-w-xl flex-wrap justify-center gap-5 sm:gap-6">
        {Array.from({ length: count }, (_, i) => (
          <span key={`${rolls}-${i}`} className={rolling ? "" : "land"}>
            <Die value={shown?.[i] ?? null} rolling={rolling} className="size-24 sm:size-28" />
          </span>
        ))}
      </div>

      {count > 1 && (
        <p className="mt-8 min-h-10 font-display text-3xl">
          {shown && <>Total {sum(shown)}</>}
        </p>
      )}
      <p aria-live="polite" className="sr-only">
        {result
          ? `Roll ${rolls}: ${result.join(", ")}${result.length > 1 ? `, total ${sum(result)}` : ""}`
          : ""}
      </p>

      <RollButton onClick={roll} disabled={rolling} className={count > 1 ? "mt-8" : "mt-12"}>
        {count === 1 ? "Roll the die" : "Roll the dice"}
      </RollButton>
      <KeyHint>Or press Space</KeyHint>

      <RoundPanel
        history={history}
        emptyText="Your rolls show up here."
        onReset={reset}
        renderItem={(values) => (
          <span className="block rounded-full bg-paper px-3 py-1 font-semibold text-ink tabular-nums">
            {values.length > 1 ? `${values.join(" + ")} = ${sum(values)}` : values[0]}
          </span>
        )}
      />
    </div>
  );
}
