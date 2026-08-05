// https://www.frontendmentor.io/challenges/typing-speed-test

import DropdownMenus from "./DropdownMenus";
import StartGame, { splitQuote } from "./GameLogic";
import ShowResults from "./ShowResults";

const btnStart = document.querySelector<HTMLButtonElement>("#start");

btnStart?.addEventListener("click", StartGame);

// show text before starting
splitQuote();

// menu interactivity + mobile
DropdownMenus();

ShowResults();

// TODO
// add a cap of ~15 user inputs per letter, so user can't just hold down 'a' for whole text, or maybe only move index when letter is right? maybe it doesn't matter as accuracy will just be near 0? (GameLogic)
// After confirming the alert/button that pops up, reset everything? ==> randomize text, add overlay back, reset timer (StartRun)
// When swapping a mode/difficulty ==> reset whole game (timer, WPM, states)

// TODO IMP
// --DONE-- Add hidden class to wrapper div and remove hidden from results div on game finish
//
// Change game ending alert to the results page
