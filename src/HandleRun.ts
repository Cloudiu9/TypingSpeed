import { syncMenuInteractiveness } from "./DropdownMenus";
import { game } from "./GameLogic";

// moved this outside for the helper function BUG?
let timer: number;

// Hiding overlay and starting race
const timerEl = document.querySelector<HTMLSpanElement>("#timer");
const overlayEl = document.querySelector<HTMLDivElement>("#overlay");
const resultsWrapper = document.querySelector<HTMLDivElement>("#results");
const mainWrapper = document.querySelector<HTMLDivElement>("#wrapper-main");
const restartBtn = document.querySelector("#results-restart-btn");

export default function StartRun() {
  function startRun() {
    game.started = true;

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

    syncMenuInteractiveness();
    clearInterval(timer);
    mainWrapper?.classList.add("hidden");
    resultsWrapper?.classList.remove("hidden");
    // TODO Reset everything ==> randomize text, add overlay back, reset timer
  }
}

export function hideResults() {
  restartBtn?.addEventListener("click", () => {
    resultsWrapper?.classList.add("hidden");
    mainWrapper?.classList.remove("hidden");
  });
}
