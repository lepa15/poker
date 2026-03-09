# Poker Hand Evaluator

A JavaScript implementation for evaluating poker hands and determining the winning combination.

The project exposes a function `bestHands` that takes an array of poker hands and returns the best one(s) according to standard poker rules.

---

## 🚀 Tech Stack

* JavaScript
* Node.js
* Jest
* ESLint

---

## ✨ Features

* Evaluates multiple poker hands
* Detects all standard poker combinations
* Returns one or multiple winning hands in case of a tie
* Includes automated tests

---

## ♠ Poker Hand Rankings

The algorithm evaluates hands according to the standard poker ranking:

| Rank | Combination     | Example         |
| ---- | --------------- | --------------- |
| 1    | Royal Flush     | T♥ K♥ Q♥ J♥ 10♥ |
| 2    | Straight Flush  | 9♠ 8♠ 7♠ 6♠ 5♠  |
| 3    | Four of a Kind  | 3♥ 3♦ 3♣ 3♠     |
| 4    | Full House      | 4♠ 4♦ 4♥ 9♣ 9♠  |
| 5    | Flush           | A♥ J♥ 9♥ 5♥ 2♥  |
| 6    | Straight        | 8♠ 7♦ 6♣ 5♥ 4♠  |
| 7    | Three of a Kind | Q♠ Q♦ Q♥ 7♣ 3♦  |
| 8    | Two Pair        | K♠ K♦ 6♥ 6♣ 2♠  |
| 9    | One Pair        | J♠ J♦ 8♣ 5♥ 3♠  |
| 10   | High Card       | A♠ K♦ 9♣ 6♥ 3♠  |

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/lepa15/poker
cd poker
```

Install dependencies:

```bash
npm install
```

---

## ▶ Usage

```javascript
import { bestHands } from './path/to/bestHands.js';

const hands = [
  'A♥ K♥ Q♥ J♥ 10♥',
  '9♠ 8♠ 7♠ 6♠ 5♠',
  '3♥ 3♦ 3♣ 3♠'
];

const winners = bestHands(hands);

console.log(winners);
// ['A♥ K♥ Q♥ J♥ 10♥']
```

The function returns an array with the best hand or multiple hands if there is a tie.

---

## 🧪 Available Scripts

| Script            | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| **npm test**      | Runs all tests using Jest.                                         |
| **npm run watch** | Runs Jest in watch mode for continuous testing during development. |
| **npm run lint**  | Runs ESLint to check code quality and style.                       |

---

## 🧠 How it Works

The algorithm:

1. Parses each hand into ranks and suits
2. Classifies the hand into a poker combination
3. Assigns a ranking value
4. Compares all hands
5. Returns the best hand(s)

---
