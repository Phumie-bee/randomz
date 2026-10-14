# Randomz

Random picks for game night: letters, words, numbers, dice, teams, Truth or Dare and Concentration.

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
- `/truth-or-dare`: truths and dares at three levels (Mild, Spicy, and 18+ behind an age check), with optional player names to track turns.
- `/concentration`: random categories for the Concentration 64 clapping game, with an on-screen clap beat (optional sound, three speeds).

## Layouts

The site picks a layout for the device:

- **Phone:** a phone app with a bottom tab bar. Each game fits on one screen.
- **Tablet** (iPad and other touch screens 640px and wider, or any screen 640–1023px wide): an iPad-style app with a sidebar.
- **Computer** (1024px and wider, with a mouse or trackpad): the website design with a top menu.

The breakpoints are the `tablet` and `desktop` variants at the top of `app/globals.css`.

## Install it on your phone

Randomz is built to feel like a phone app. Open the site on your phone, then:

- **iPhone (Safari):** tap Share, then **Add to Home Screen**.
- **Android (Chrome):** tap the menu, then **Add to Home screen** or **Install app**.

It then opens full screen from its own icon, without the browser bars.

## Changing the words

Truth or Dare prompts are in `lib/truth-or-dare.ts` and Concentration categories in `lib/concentration.ts`.

The word lists live in `lib/words.ts`. Add words to a category, or add a new category to the list and it shows up on the word page automatically.
# randomz
