import { syncMenuInteractiveness } from "./DropdownMenus";
import { game } from "./GameLogic";

export default function StartRun() {
  // Hiding overlay and starting race
  const btnStart = document.querySelector<HTMLButtonElement>("#start");
  const timerEl = document.querySelector<HTMLSpanElement>("#timer");
  const overlayEl = document.querySelector<HTMLDivElement>("#overlay");

  function startRun() {
    game.started = true;

    // hide overlay
    overlayEl?.classList.add("hidden");

    // start clock
    const timer = setInterval(() => {
      game.timeRemaining--;
      if (timerEl && game.timeRemaining >= 0) {
        timerEl.textContent = "0:" + `${game.timeRemaining}`.padStart(2, "0");
      }

      if (game.timeRemaining <= 0 || game.finished === true) {
        game.finished = true;
        game.started = false;

        syncMenuInteractiveness();
        clearInterval(timer);
        alert(`You type ${game.WPM} WPM`);
        // TODO After confirming the alert/button that pops up, reset everything? ==> randomize text, add overlay back, reset timer
      }
    }, 1000);
  }

  btnStart?.addEventListener("click", startRun);
}
