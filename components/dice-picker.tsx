"use client";

import { useState } from "react";
import { randomInt } from "@/lib/random";
import { useRollAnimation } from "@/lib/use-roll";
import { ChoiceChips } from "./choice-chips";
import { Die } from "./die";
import { RollButton, RollNote, RoundStrip } from "./game-controls";
import { GameScreen } from "./game-screen";

const counts = [1, 2, 3, 4, 5, 6].map((n) => ({ value: n, label: String(n) }));

// On phones and tablets, fewer dice are drawn bigger and sizes shrink on
// short screens. Computers show one row of same-size dice.
const dieLayout: Record<number, { grid: string; die: string }> = {
  1: {
    grid: "grid-cols-1",
    die: "size-[min(44vw,30dvh,11rem)] tablet:size-[min(36vw,30dvh,14rem)]",
  },
  2: {
    grid: "grid-cols-2",
    die: "size-[min(38vw,24dvh,9rem)] tablet:size-[min(30vw,26dvh,11rem)]",
  },
  3: {
    grid: "grid-cols-3",
    die: "size-[min(26vw,18dvh,7rem)] tablet:size-[min(22vw,20dvh,9rem)]",
  },
  4: {
    grid: "grid-cols-2",
    die: "size-[min(30vw,15dvh,7rem)] tablet:size-[min(24vw,17dvh,8.5rem)]",
  },
  5: {
    grid: "grid-cols-3",
    die: "size-[min(25vw,13dvh,6rem)] tablet:size-[min(20vw,16dvh,8rem)]",
  },
  6: {
    grid: "grid-cols-3",
    die: "size-[min(25vw,13dvh,6rem)] tablet:size-[min(20vw,16dvh,8rem)]",
  },
};

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
  const layout = dieLayout[count];

  return (
    <GameScreen
      title="Dice"
      appTitle="Dice"
      controls={
        <ChoiceChips
          legend="How many dice"
          name="count"
          options={counts}
          value={count}
          onChange={changeCount}
          variant="segmented"
        />
      }
      round={() => (
        <RoundStrip
          history={history}
          emptyText="Your rolls show up here."
          onReset={reset}
          renderItem={(values) => (
            <span className="block rounded-full bg-paper px-3 py-1.5 font-semibold whitespace-nowrap text-ink tabular-nums">
              {values.length > 1 ? `${values.join(" + ")} = ${sum(values)}` : values[0]}
            </span>
          )}
        />
      )}
      action={
        <>
          <RollButton onClick={roll} disabled={rolling}>
            {count === 1 ? "Roll the die" : "Roll the dice"}
          </RollButton>
          <RollNote keyboardOnly>Or press Space</RollNote>
        </>
      }
    >
      <div className="flex flex-col items-center">
        <div
          className={`grid gap-4 tablet:gap-6 desktop:flex desktop:flex-wrap desktop:justify-center desktop:gap-6 ${layout.grid}`}
        >
          {Array.from({ length: count }, (_, i) => (
            <span key={`${rolls}-${i}`} className={rolling ? "" : "land"}>
              <Die
                value={shown?.[i] ?? null}
                rolling={rolling}
                className={`${layout.die} desktop:size-28`}
              />
            </span>
          ))}
        </div>
        {count > 1 && (
          <p className="mt-6 min-h-9 font-display text-2xl tablet:mt-8 tablet:text-3xl desktop:mt-8 desktop:text-3xl">
            {shown && <>Total {sum(shown)}</>}
          </p>
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        {result
          ? `Roll ${rolls}: ${result.join(", ")}${result.length > 1 ? `, total ${sum(result)}` : ""}`
          : ""}
      </p>
    </GameScreen>
  );
}
