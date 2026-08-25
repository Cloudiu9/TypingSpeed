// https://www.frontendmentor.io/challenges/typing-speed-test

import DropdownMenus from "./DropdownMenus";
import StartGame, { calculatePB, getRacingText } from "./GameLogic";

const btnStart = document.querySelector<HTMLButtonElement>("#start");

btnStart?.addEventListener("click", StartGame);

// show text before starting
getRacingText();

// menu interactivity + mobile
DropdownMenus();

// retrieve PB
calculatePB();

// TODO General
// --DONE-- (added a lockout at 5 mistakes instead) add a cap of ~15 user inputs per letter, so user can't just hold down 'a' for whole text, or maybe only move index when letter is right? maybe it doesn't matter as accuracy will just be near 0? (GameLogic)
// --DONE-- After confirming the alert/button that pops up, reset everything? ==> randomize text, add overlay back, reset timer (StartRun)
// --DONE-- When swapping a mode/difficulty ==> reset whole game (timer, WPM, states)
// maybe add an optional "Save Score?" button on results page instead of always saving PB?

// BUG IMP
// Typing test ends 1 character too soon. (can't type final .)
//     -- Fixed by moving the game ending check before increasing index (needs more testing?)
// On mobile there's a lot of space at the end that gets scrolled to when the user inputs a 'space' while typing.
// On game restart, difficulty resets easy, but the menus don't show it ==> need to remake logic, now it only handles clicking difficulties, game restart should... //
//     -- Fixed by simply not resetting the difficulty to Easy with defaultGame

// TODO IMP
// --DONE-- Add hidden class to wrapper div and remove hidden from results div on game finish
// --DONE-- Change game ending alert to the results page
// --DONE-- Reset game state to beginning after clicking restart (make restart btn actually restart) ==> just had to unhide Start btn
// --DONE-- Implemented backspace functionality
// --DONE-- Save personal best WPM in localStorage
// Finish updating results page for the different scenarios (new PB, first run, etc.)
// Polish and optimize mobile look and feel
