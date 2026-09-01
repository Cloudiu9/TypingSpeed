import DropdownMenus, { syncMenuInteractiveness } from "./DropdownMenus";
import {
  calculateAccuracy,
  calculatePB,
  calculateWPM,
  defaultGame,
  game,
} from "./GameLogic";

// moved this outside for the helper function BUG?
let timer: number;

const timerEl = document.querySelector<HTMLSpanElement>("#timer");
const overlayEl = document.querySelector<HTMLDivElement>("#overlay");
const resultsWrapper = document.querySelector<HTMLDivElement>("#results");
const resultsWrapperFirst =
  document.querySelector<HTMLDivElement>("#results-first");
const resultsWrapperPB = document.querySelector<HTMLDivElement>("#results-pb");
const mainWrapper = document.querySelector<HTMLDivElement>("#wrapper-main");
const restartBtnAll = document.querySelectorAll("#results-restart");

// Hiding overlay and starting race

const restartGame = () => {
  // reset game state
  Object.assign(game, defaultGame);

  // show overlay
  overlayEl?.classList.remove("hidden");

  // hide results
  resultsWrapper?.classList.add("hidden");
  resultsWrapperFirst?.classList.add("hidden");
  resultsWrapperPB?.classList.add("hidden");
  resultsWrapper?.classList.remove("flex");
  resultsWrapperFirst?.classList.remove("flex");
  resultsWrapperPB?.classList.remove("flex");

  mainWrapper?.classList.remove("hidden");

  // Reset UI
  calculateWPM();
  calculateAccuracy();
  DropdownMenus();

  if (!timerEl) return;
  timerEl.textContent = "0:60";
};

restartBtnAll.forEach((btn) => {
  btn?.addEventListener("click", restartGame);
});

export default function StartRun() {
  function startRun() {
    game.started = true;

    // clear on restart to avoid stacking
    clearInterval(timer);

    // hide overlay
    overlayEl?.classList.add("hidden");

    // start clock
    timer = setInterval(() => {
      game.timeRemaining--;
      if (timerEl && game.timeRemaining >= 0) {
        timerEl.textContent = "0:" + `${game.timeRemaining}`.padStart(2, "0");
      }

      endGame();
    }, 1000);
  }

  startRun();
}

function endGame() {
  if (game.timeRemaining <= 0 || game.finished === true) {
    game.finished = true;
    game.started = false;

    if (game.PB === 0) {
      resultsWrapperFirst?.classList.remove("hidden");
      resultsWrapperFirst?.classList.add("flex");

      syncMenuInteractiveness();
      clearInterval(timer);
      calculatePB();
      mainWrapper?.classList.add("hidden");
      return;
    }

    if (game.PB < game.WPM) {
      resultsWrapperPB?.classList.remove("hidden");
      resultsWrapperPB?.classList.add("flex");

      syncMenuInteractiveness();
      clearInterval(timer);
      calculatePB();
      mainWrapper?.classList.add("hidden");
      return;
    }

    syncMenuInteractiveness();
    clearInterval(timer);
    calculatePB();
    mainWrapper?.classList.add("hidden");

    resultsWrapper?.classList.remove("hidden");
    resultsWrapper?.classList.add("flex");

    // Reset everything ==> randomize text, add overlay back, reset timer
    // ==> added global event listener, just unhides starting overlay is enough (?)
  }
}
