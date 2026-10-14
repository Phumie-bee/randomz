export function randomItem<T>(items: readonly T[]): T {
  const [n] = crypto.getRandomValues(new Uint32Array(1));
  return items[n % items.length];
}
