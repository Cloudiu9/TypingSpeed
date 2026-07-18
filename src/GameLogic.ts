// TODO
// add a cap of ~15 user inputs per letter, so user can't just hold down 'a' for whole text, or maybe only move index when letter is right? maybe it doesn't matter as accuracy will just be near 0?

import StartRun from "./StartRun";
import data from "../data.json";

const racingText = document.querySelector<HTMLParagraphElement>("#racing-text");
const WPM = document.querySelector<HTMLSpanElement>("#wpm-cur");

// Source of truth for game state
const game = {
  text: "",
  currentIndex: 0,
  mistakes: 0,
  started: false,
  finished: false,
  difficulty: "Easy",
  mode: "Timed",
  timeRemaining: 60,
};

export default function StartGame() {
  // starts timer
  StartRun();

  // split each character into a span
  splitQuote();

  // listen for user typing and update state
  userTyping();
}

// https://www.geeksforgeeks.org/javascript/design-a-typing-speed-test-game-using-javascript/
function splitQuote() {
  if (!racingText) return;
  racingText.textContent = null;

  // get difficulty from game state
  const difficultyKey = game.difficulty.toLowerCase() as keyof typeof data;

  const randomNum = Math.floor(Math.random() * 10);

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
    }

    if (!WPM) return;
    WPM.textContent = String(game.currentIndex);
    // console.log(e.key, game.text[game.currentIndex]);

    // mark letter as right
    racingText?.children[game.currentIndex].classList.add("text-green-600");

    // move to the next letter
    game.currentIndex++;

    if (!racingText?.children[game.currentIndex]) return;

    // mark letter to type
    racingText?.children[game.currentIndex].classList.add("underline");

    // console.log(racingText?.children[game.currentIndex].textContent);
  });
}
