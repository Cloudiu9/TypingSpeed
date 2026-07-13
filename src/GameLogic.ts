// TODO
/* 1. game state


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
*/

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
