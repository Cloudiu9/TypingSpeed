import StartRun from "./HandleRun";
import data from "../data.json";
import { syncMenuInteractiveness } from "./DropdownMenus";
import handleStorage from "./HandleStorage";

const racingText = document.querySelector<HTMLParagraphElement>("#racing-text");
const WPMDiv = document.querySelector<HTMLSpanElement>("#wpm-cur");
const ACCDiv = document.querySelector<HTMLSpanElement>("#acc-cur");
const lockPopup = document.querySelector<HTMLDivElement>("#lock-popup");

// needs to be like this to also update mobile version
const wpmPB = document.querySelectorAll<HTMLSpanElement>(".wpm-pb");

// Results
const wpmSpan = document.querySelector("#results-wpm");
const accSpan = document.querySelector("#results-acc");
const corSpan = document.querySelector("#results-cor");
const wrongSpan = document.querySelector("#results-wrong");

// for mobile input
const typingInput = document.querySelector<HTMLInputElement>("#typing-input");

document?.addEventListener("click", () => {
  if (!game.started) return;

  typingInput?.focus();
});

// zero width space (invisible character)
// needs to be in the input in order for backspace to work
const ZWSP = "\u200b";

// call once, and again after every input event
function resetInput() {
  if (typingInput) typingInput.value = ZWSP;
}

resetInput(); // initialize on load

// --DONE-- Correct mistakes with backspace (original errors still count against accuracy)
// Refactored to work for mobile IMP
typingInput?.addEventListener("input", (e: Event) => {
  const inputEvent = e as InputEvent;
  const value = typingInput.value;

  if (!game.started || game.finished) {
    resetInput();
    return;
  }

  // backspace: value is shorter than the baseline placeholder
  if (
    value.length < ZWSP.length ||
    inputEvent.inputType === "deleteContentBackward"
  ) {
    if (game.currentIndex > 0) {
      racingText?.children[game.currentIndex].classList.remove("underline");
      game.currentIndex--;
      racingText?.children[game.currentIndex].classList.remove("text-red-600");
      racingText?.children[game.currentIndex].classList.remove(
        "text-green-600",
      );
      racingText?.children[game.currentIndex].classList.add("underline");

      calculateWPM();
      calculateAccuracy();

      game.typingLock = false;
      game.consecutiveMistakes = 0;
      lockPopup?.classList.add("hidden");
    }
    resetInput();
    return;
  }

  // anything typed shows up AFTER the placeholder
  const typedChars = value.slice(ZWSP.length);

  for (const key of typedChars) {
    if (game.typingLock) break;
    if (!racingText?.children[game.currentIndex]) break;

    game.totalTyped++;

    if (key !== game.text[game.currentIndex]) {
      racingText?.children[game.currentIndex].classList.add("text-red-600");
      game.mistakes++;
      game.consecutiveMistakes++;

      if (game.consecutiveMistakes >= 5) {
        game.typingLock = true;
        lockPopup?.classList.remove("hidden");
      }
    } else {
      game.consecutiveMistakes = 0;
      racingText?.children[game.currentIndex].classList.add("text-green-600");
    }

    calculateWPM();
    calculateAccuracy();

    if (game.currentIndex + 1 === game.text.length) {
      game.started = false;
      game.finished = true;
      syncMenuInteractiveness();
    }

    racingText?.children[game.currentIndex].classList.remove("underline");
    game.currentIndex++;

    if (racingText?.children[game.currentIndex]) {
      racingText.children[game.currentIndex].classList.add("underline");
    }
  }

  resetInput();
});

// Source of truth for game state
export const game = {
  text: "",
  currentIndex: 0, // current position in text
  totalTyped: 0, // total character attempts
  mistakes: 0, // total wrong character attempts
  consecutiveMistakes: 0,
  started: false,
  finished: false,
  typingLock: false,
  difficulty: "Easy",
  mode: "Timed",
  timeRemaining: 60,
  WPM: 0,
  PB: 0,
  accuracy: 0,
};

export const defaultGame = {
  text: "",
  currentIndex: 0,
  totalTyped: 0,
  mistakes: 0,
  consecutiveMistakes: 0,
  started: false,
  finished: false,
  typingLock: false,
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

  // underline letters
  userTyping();

  // retrieve PB
  calculatePB();
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
      (game.totalTyped / 5) * (60 / (60 - game.timeRemaining)),
    );
    game.WPM = WPMFormula;

    WPMDiv.textContent = String(game.WPM);

    // Results page
    if (!wpmSpan) return;
    wpmSpan.textContent = String(game.WPM);
  }
}

export function calculatePB() {
  if (!wpmPB) return;
  // on game end, update WPM to PB
  if (game.PB < game.WPM) {
    game.PB = game.WPM;
  }
  handleStorage();
  // needs to be like this to also update mobile version
  wpmPB.forEach((span) => {
    span.textContent = String(game.PB) + "WPM";
  });
}

export function calculateAccuracy() {
  if (!ACCDiv) return;

  // restart
  if (game.totalTyped === 0) {
    ACCDiv.textContent = "0%";
    return;
  }

  // BUG goes into negative when pressing backspace (-48/54)
  // TODO change this with game.totalTyped
  const correctChars = game.totalTyped - game.mistakes;

  let ACCFormula = Math.round((correctChars / game.totalTyped) * 100);

  // caps formula
  if (ACCFormula < 0) ACCFormula = 0;
  if (ACCFormula > 100) ACCFormula = 100;

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
