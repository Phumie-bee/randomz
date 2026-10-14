"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { randomItem } from "./random";

const FLICKER_MS = 70;
const ROLL_MS = 700;

type Timers = { interval?: number; timeout?: number };

/**
 * Runs the roll animation: a quick run of random faces, then the real
 * result lands. Also lets Space call `onSpace` from anywhere on the page,
 * unless focus is on a control that already uses Space.
 */
export function useRollAnimation<T>(onSpace: () => void) {
  const [flicker, setFlicker] = useState<T | null>(null);
  const timers = useRef<Timers>({});

  function stop() {
    window.clearInterval(timers.current.interval);
    window.clearTimeout(timers.current.timeout);
    setFlicker(null);
  }

  function animate(randomFace: () => T, land: () => void) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      land();
      return;
    }

    setFlicker(randomFace());
    timers.current.interval = window.setInterval(() => setFlicker(randomFace()), FLICKER_MS);
    timers.current.timeout = window.setTimeout(() => {
      stop();
      land();
    }, ROLL_MS);
  }

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key !== " " || event.repeat) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button, a, input, select, textarea, [contenteditable]")) return;
    event.preventDefault();
    onSpace();
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const t = timers.current;
    return () => {
      window.clearInterval(t.interval);
      window.clearTimeout(t.timeout);
    };
  }, []);

  return { flicker, rolling: flicker !== null, animate, stop };
}

/**
 * Picks a random item from `pool` with the roll animation. Keeps a history
 * of picks for the current round, and when `noRepeats` is on, never picks
 * the same item twice in a round.
 */
export function useRoll(pool: readonly string[], { noRepeats }: { noRepeats: boolean }) {
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [rolls, setRolls] = useState(0);
  const { flicker, rolling, animate, stop } = useRollAnimation<string>(() => roll());

  const used = new Set(history);
  const available = noRepeats ? pool.filter((item) => !used.has(item)) : pool;

  function roll() {
    if (rolling || available.length === 0) return;
    const pick = randomItem(available);
    animate(
      () => randomItem(pool),
      () => {
        setResult(pick);
        setHistory((h) => [...h, pick]);
        setRolls((n) => n + 1);
      },
    );
  }

  function reset() {
    stop();
    setResult(null);
    setHistory([]);
  }

  return {
    shown: flicker ?? result,
    result,
    rolling,
    rolls,
    history,
    available,
    roll,
    reset,
  };
}
