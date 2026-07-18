// TODO

import StartRun from "./StartRun";
import data from "../data.json"

const racingText = document.querySelector<HTMLParagraphElement>("#racing-text");

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

/* 
1. Click start
2. Timer starts
3. User can write => if letter matches => turn it green, else red
*/

export default function StartGame() {
  // starts timer
  StartRun();

  // split each character into a span
}
// https://www.geeksforgeeks.org/javascript/design-a-typing-speed-test-game-using-javascript/
function splitQuote() {
  racingText.textContent = null;
  game.text = data.easy[]
}

/* 2. One span per character:
gray (not typed)
green (correct)
red (incorrect)
underlined/current
*/

/*3. Capture keyboard input

Instead of an <input>, listen for keyboard events.

keydown
or
beforeinput

Whenever a key is pressed:

compare it to the current character
update the current index
mark that character as correct/incorrect
move the caret

*/
