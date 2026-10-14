"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { randomItem } from "./random";

const FLICKER_MS = 70;
const ROLL_MS = 700;

type Timers = { interval?: number; timeout?: number };

/**
 * Picks a random item from `pool` with a short flicker before it lands.
 * Keeps a history of picks for the current round, and when `noRepeats`
 * is on, never picks the same item twice in a round.
 */
export function useRoll(pool: readonly string[], { noRepeats }: { noRepeats: boolean }) {
  const [result, setResult] = useState<string | null>(null);
  const [flicker, setFlicker] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [rolls, setRolls] = useState(0);
  const timers = useRef<Timers>({});

  const available = noRepeats ? pool.filter((item) => !history.includes(item)) : pool;
  const rolling = flicker !== null;

  function stopTimers() {
    window.clearInterval(timers.current.interval);
    window.clearTimeout(timers.current.timeout);
  }

  function land(pick: string) {
    setFlicker(null);
    setResult(pick);
    setHistory((h) => [...h, pick]);
    setRolls((n) => n + 1);
  }

  function roll() {
    if (rolling || available.length === 0) return;
    const pick = randomItem(available);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      land(pick);
      return;
    }

    setFlicker(randomItem(pool));
    timers.current.interval = window.setInterval(
      () => setFlicker(randomItem(pool)),
      FLICKER_MS,
    );
    timers.current.timeout = window.setTimeout(() => {
      window.clearInterval(timers.current.interval);
      land(pick);
    }, ROLL_MS);
  }

  function reset() {
    stopTimers();
    setFlicker(null);
    setResult(null);
    setHistory([]);
  }

  // Space rolls from anywhere on the page, unless focus is on a control
  // that already uses Space.
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key !== " " || event.repeat) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button, a, input, select, textarea, [contenteditable]")) return;
    event.preventDefault();
    roll();
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
