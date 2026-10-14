/** Reads player names typed one per line or separated by commas. */
export function parseNames(text: string) {
  return text
    .split(/[\n,]/)
    .map((name) => name.trim())
    .filter(Boolean);
}
