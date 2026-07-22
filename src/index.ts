// https://www.frontendmentor.io/challenges/typing-speed-test

import DropdownMenus from "./DropdownMenus";
import StartGame from "./GameLogic";

StartGame();

// menu interactivity + mobile
DropdownMenus();

// TODO
// 1. add a cap of ~15 user inputs per letter, so user can't just hold down 'a' for whole text, or maybe only move index when letter is right? maybe it doesn't matter as accuracy will just be near 0? (GameLogic)
// 2. Change game ending alert to the results page
// 3. After confirming the alert/button that pops up, reset everything? ==> randomize text, add overlay back, reset timer (StartRun)
// 4. When swapping a mode/difficulty ==> reset whole game (timer, WPM, states)
