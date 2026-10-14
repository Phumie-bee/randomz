/** A random whole number from 0 up to (but not including) `max`. */
export function randomInt(max: number): number {
  const [n] = crypto.getRandomValues(new Uint32Array(1));
  return n % max;
}

export function randomItem<T>(items: readonly T[]): T {
  return items[randomInt(items.length)];
}

export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
