import StartRun from "./HandleRun";
import data from "../data.json";
import { syncMenuInteractiveness } from "./DropdownMenus";

const racingText = document.querySelector<HTMLParagraphElement>("#racing-text");
const WPMDiv = document.querySelector<HTMLSpanElement>("#wpm-cur");
const ACCDiv = document.querySelector<HTMLSpanElement>("#acc-cur");

// Results
const wpmSpan = document.querySelector("#results-wpm");
const accSpan = document.querySelector("#results-acc");
const corSpan = document.querySelector("#results-cor");
const wrongSpan = document.querySelector("#results-wrong");

// Global event listener to avoid stacking on restart.
document.addEventListener("keydown", (e) => {
  if (!game.started || game.finished) return;
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

  // mark letter as right
  racingText?.children[game.currentIndex].classList.add("text-green-600");

  // Mark game as finished when reaching end BUG?? fixed by moving this before currentIndex++ ?

  if (game.currentIndex + 1 === game.text.length) {
    game.started = false;
    game.finished = true;

    // re-enable menus
    syncMenuInteractiveness();
  }

  // move to the next letter
  game.currentIndex++;

  if (!racingText?.children[game.currentIndex]) return;

  // mark letter to type
  racingText?.children[game.currentIndex].classList.add("underline");
});

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
};

export const defaultGame = {
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
  getRacingText();

  // listen for user typing and update state
  userTyping();
}

// https://www.geeksforgeeks.org/javascript/design-a-typing-speed-test-game-using-javascript/
export function getRacingText() {
  if (!racingText) return;
  racingText.textContent = null;
  game.currentIndex = 0;

  // get difficulty from game state
  const difficultyKey = game.difficulty.toLowerCase() as keyof typeof data;

  const quotesNumber = data[difficultyKey].length;

  const randomNum = Math.floor(Math.random() * quotesNumber);

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
}

export function calculateWPM() {
  if (!WPMDiv) return;
  // WPM = (characters_typed / 5) * (60 / time_passed)

  // prevents first second from bugging out
  if (60 - game.timeRemaining === 0) {
    game.WPM = 0;

    // restart
    WPMDiv.textContent = String(game.WPM);
  } else {
    const WPMFormula = Math.trunc(
      ((game.currentIndex + 1) / 5) * (60 / (60 - game.timeRemaining)),
    );
    game.WPM = WPMFormula;

    WPMDiv.textContent = String(game.WPM);

    // Results page
    if (!wpmSpan) return;
    wpmSpan.textContent = String(game.WPM);
  }
}

export function calculateAccuracy() {
  if (!ACCDiv) return;

  // restart
  if (game.timeRemaining === 60) {
    ACCDiv.textContent = "0%";
    return;
  }

  const correctChars = game.currentIndex + 1 - game.mistakes;

  const ACCFormula = Math.round((correctChars / (game.currentIndex + 1)) * 100);

  game.accuracy = ACCFormula;
  ACCDiv.textContent = String(game.accuracy) + "%";

  // Results page
  if (!accSpan) return;
  accSpan.textContent = String(game.accuracy) + "%";

  if (!corSpan) return;
  corSpan.textContent = String(correctChars);

  if (!wrongSpan) return;
  wrongSpan.textContent = String(game.mistakes);
}
