// https://www.frontendmentor.io/challenges/typing-speed-test

import DropdownMenus from "./DropdownMenus";
import StartGame, { getRacingText } from "./GameLogic";

const btnStart = document.querySelector<HTMLButtonElement>("#start");

btnStart?.addEventListener("click", StartGame);

// show text before starting
getRacingText();

// menu interactivity + mobile
DropdownMenus();

// TODO
// add a cap of ~15 user inputs per letter, so user can't just hold down 'a' for whole text, or maybe only move index when letter is right? maybe it doesn't matter as accuracy will just be near 0? (GameLogic)
// After confirming the alert/button that pops up, reset everything? ==> randomize text, add overlay back, reset timer (StartRun)
// When swapping a mode/difficulty ==> reset whole game (timer, WPM, states)

// TODO
// BUG Typing test ends 1 character too soon. (can't type final .) Fixed by moving the game ending check before increasing index (needs more testing?)

// TODO IMP
// --DONE-- Add hidden class to wrapper div and remove hidden from results div on game finish
//
// --DONE-- Change game ending alert to the results page
// --DONE-- Reset game state to beginning after clicking restart (make restart btn actually restart) ==> just had to unhide Start btn
