"use client";

import { useEffect, useRef, useState } from "react";

export const tempos = { slow: 80, normal: 100, fast: 120 } as const;
export type Tempo = keyof typeof tempos;

type Audio = { ctx: AudioContext; noise: AudioBuffer };

// A short burst of white noise, filtered, sounds like a hand clap.
function makeNoise(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.2), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function playClap({ ctx, noise }: Audio, accent: boolean) {
  const t = ctx.currentTime;
  const source = ctx.createBufferSource();
  source.buffer = noise;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = accent ? 1400 : 1100;
  filter.Q.value = 0.9;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(accent ? 0.9 : 0.55, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start(t);
  source.stop(t + 0.15);
}

/**
 * A steady four-beat clap to keep time in Concentration. `beat` is 0–3 while
 * running and null when stopped. With `sound` on, each beat claps, louder on
 * the first. Tempo and sound changes apply from the next beat.
 */
export function useBeat({ bpm, sound }: { bpm: number; sound: boolean }) {
  const [beat, setBeat] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const audio = useRef<Audio | null>(null);
  const settings = useRef({ bpm, sound });

  useEffect(() => {
    settings.current = { bpm, sound };
  }, [bpm, sound]);

  useEffect(() => {
    const t = timer;
    const a = audio;
    return () => {
      window.clearTimeout(t.current);
      void a.current?.ctx.close();
    };
  }, []);

  function start() {
    if (beat !== null) return;
    // Browsers (iPhones especially) only allow sound to start from a tap.
    if (!audio.current) {
      const ctx = new AudioContext();
      audio.current = { ctx, noise: makeNoise(ctx) };
    }
    void audio.current.ctx.resume();

    let count = 0;
    const tick = () => {
      const n = count % 4;
      setBeat(n);
      if (settings.current.sound && audio.current) playClap(audio.current, n === 0);
      count += 1;
      timer.current = window.setTimeout(tick, 60_000 / settings.current.bpm);
    };
    tick();
  }

  function stop() {
    window.clearTimeout(timer.current);
    setBeat(null);
  }

  return { beat, running: beat !== null, start, stop };
}
