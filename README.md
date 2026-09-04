# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./public/design/TypingSpeed.png)

### Links

- Live Site URL: [TypingSpeed](https://typingspeed-cyan.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- Flexbox
- Mobile-first workflow
- TypeScript

### What I learned

## Practiced creating and manipulating game state, which was essential to build a fully functioning product.

```js
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
  timeRemaining: 0,
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
  timeRemaining: 0,
  WPM: 0,
  accuracy: 0,
};
```

### defaultGame is used to reset the game state on restart.

```js
Object.assign(game, defaultGame);
```

## Used an invisible 'input' field, which acts as a way of triggering the mobile keyboard.

```html
<input
  id="typing-input"
  type="text"
  autocomplete="off"
  autocorrect="off"
  autocapitalize="off"
  spellcheck="false"
  class="absolute w-px h-px opacity-0"
/>
```

### Had to ensure this input always has a character in it, despite not being used, to allow backspaces.

```js
// zero width space (invisible character)
// needs to be in the input in order for backspace to work
const ZWSP = "\u200b";

// call once, and again after every input event
function resetInput() {
  if (typingInput) typingInput.value = ZWSP;
}
```

### Handled Backspace by moving the cursor back, removing the previous character's styling, and recalculating the stats.

```js
// backspace: value is shorter than the baseline placeholder
if (
  value.length < ZWSP.length ||
  inputEvent.inputType === "deleteContentBackward"
) {
  if (game.currentIndex > 0) {
    racingText?.children[game.currentIndex].classList.remove("underline");
    game.currentIndex--;
    racingText?.children[game.currentIndex].classList.remove("text-red-600");
    racingText?.children[game.currentIndex].classList.remove("text-green-600");
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
```

## Implemented a popup that singals a typing lockout to the user whenever they've made 5 consecutive typing mistakes, in order to prevent a very low accuracy.

```js
if (game.consecutiveMistakes >= 5) {
  game.typingLock = true;
  lockPopup?.classList.remove("hidden");
}
```

### Backspace can remove the lock, allowing the user to correct their mistakes and continue typing.

**## Learned how to use the native HTML Popover API to create the mobile difficulty and mode menus.**

**### `popovertarget` connects a button to a popover element, allowing the browser to handle opening and closing the menu.**

```html
<button popovertarget="difficulty-menu">Difficulty</button>

<div popover id="difficulty-menu">...</div>
```

**## Used CSS Anchor Positioning to position each popover relative to its corresponding button.**

**### The button's parent defines an anchor name, while the popover uses `position-anchor` to reference it.**

```html
<div class="[anchor-name:--diff-btn]">
  <button popovertarget="difficulty-menu">Difficulty</button>

  <div
    popover
    id="difficulty-menu"
    class="supports-position-anchor:[position-anchor:--diff-btn]
           supports-position-anchor:top-[anchor(bottom)]
           supports-position-anchor:left-[anchor(left)]"
  >
    ...
  </div>
</div>
```

**### `anchor(bottom)` positions the top of the popover at the bottom of the button, while `anchor(left)` aligns their left edges.**

**### Used `supports-position-anchor:` so the positioning rules only apply when the browser supports CSS Anchor Positioning.**
