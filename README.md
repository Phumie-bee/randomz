# Randomz

Random picks for game night: letters, words, numbers, dice and teams.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Pages

- `/letter`: roll a random letter, with no repeats per round and an option to skip hard letters.
- `/word`: draw a random word to act out or draw, from any category or just one.
- `/number`: pick a random number from any range.
- `/dice`: roll one to six dice.
- `/teams`: split a list of players into random teams.

## Changing the words

The word lists live in `lib/words.ts`. Add words to a category, or add a new category to the list and it shows up on the word page automatically.
# randomz
