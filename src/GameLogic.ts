import StartRun from "./StartRun";
import data from "../data.json";
import { syncMenuInteractiveness } from "./DropdownMenus";

const racingText = document.querySelector<HTMLParagraphElement>("#racing-text");
const WPMButton = document.querySelector<HTMLSpanElement>("#wpm-cur");
const ACCButton = document.querySelector<HTMLSpanElement>("#acc-cur");

// Source of truth for game state
export const game = {
  text: "",
  currentIndex: 0,
  mistakes: 0,
  started: false,
  finished: false,
  difficulty: "Easy",
  mode: "Timed",
  timeRemaining: 60,
  WPM: 0,
  accuracy: 0,
  quotesNo: 15, // TODO change this so it's dynamic to the length of a difficulty (easy: 15)
};

export default function StartGame() {
  // Update state flags
  game.started = true;
  game.finished = false;

  // Sync menus
  syncMenuInteractiveness();

  // starts timer
  StartRun();

  // split each character into a span
  splitQuote();

  // listen for user typing and update state
  userTyping();
}

// https://www.geeksforgeeks.org/javascript/design-a-typing-speed-test-game-using-javascript/
export function splitQuote() {
  if (!racingText) return;
  racingText.textContent = null;
  game.currentIndex = 0;

  // get difficulty from game state
  const difficultyKey = game.difficulty.toLowerCase() as keyof typeof data;

  const randomNum = Math.floor(Math.random() * game.quotesNo);

  // change state to a random text
  game.text = data[difficultyKey][randomNum].text;

  // Split each char into a span
  game.text.split("").forEach((char) => {
    const charSpan = document.createElement("span");

    // put the current letter in the span
    charSpan.innerText = char;

    // add the span to the parent div
    racingText.appendChild(charSpan);
  });
}

function userTyping() {
  // reset index on retry
  game.currentIndex = 0;

  // mark first letter
  racingText?.children[game.currentIndex].classList.add("underline");

  document.addEventListener("keydown", (e) => {
    // prevent null error when text ends
    if (!racingText?.children[game.currentIndex]) return;

    // don't capture unwanted keys (ctrl, tab, etc.)
    if (e.key.length !== 1) return;

    // compare e.key to current key
    if (e.key !== game.text[game.currentIndex]) {
      // mark letter as wrong
      racingText?.children[game.currentIndex].classList.add("text-red-600");

      game.mistakes++;
    }

    calculateWPM();
    calculateAccuracy();

    // console.log(e.key, game.text[game.currentIndex]);

    // mark letter as right
    racingText?.children[game.currentIndex].classList.add("text-green-600");

    // move to the next letter
    game.currentIndex++;

    if (!racingText?.children[game.currentIndex]) return;

    // mark letter to type
    racingText?.children[game.currentIndex].classList.add("underline");

    // Mark game as finished when reaching end
    if (game.currentIndex + 1 === game.text.length) {
      game.started = false;
      game.finished = true;

      // re-enable menus
      syncMenuInteractiveness();
    }
  });
}

function calculateWPM() {
  if (!WPMButton) return;
  // WPM = (characters_typed / 5) * (60 / time_passed)
  if (60 - game.timeRemaining === 0) {
    game.WPM = 0;
  } else {
    const WPMFormula = Math.trunc(
      ((game.currentIndex + 1) / 5) * (60 / (60 - game.timeRemaining)),
    );
    game.WPM = WPMFormula;

    WPMButton.textContent = String(game.WPM);
  }
}

function calculateAccuracy() {
  if (!ACCButton) return;

  const correctChars = game.currentIndex + 1 - game.mistakes;

  const ACCFormula = Math.round((correctChars / (game.currentIndex + 1)) * 100);
  console.log(correctChars, game.currentIndex + 1);

  game.accuracy = ACCFormula;
  ACCButton.textContent = String(game.accuracy) + "%";
}
