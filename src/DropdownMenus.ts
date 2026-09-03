import { game, getRacingText } from "./GameLogic";

const ACTIVE_CLASS = ["bg-blue-600", "text-white"];

const timerEl = document.querySelector<HTMLSpanElement>("#timer");

export default function DropdownMenus() {
  // Display/hide menu dropdown (difficulty)
  const popoverDiff = document.querySelector("#difficulty-menu") as HTMLElement;
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  difficultyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      setActiveButtons(target, ".difficulty-btn", ACTIVE_CLASS);

      const selectedDifficulty = target.getAttribute("data-value");
      game.difficulty = selectedDifficulty ?? "Easy";

      // Changing text when difficulty changes
      getRacingText();

      // browser hooks popovertarget to popover element and automatically handles toggling the visibility of the dropdown menu (from HTML)
      // still have to close manually when choosing a difficulty
      if (popoverDiff && "hidePopover" in popoverDiff)
        popoverDiff.hidePopover();
    });
  });

  // Display/hide menu dropdown (mode)
  const popoverMode = document.querySelector("#mode-menu") as HTMLElement;
  const modeButtons = document.querySelectorAll(".mode-btn");

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!timerEl) return;

      const target = e.currentTarget as HTMLButtonElement;
      setActiveButtons(target, ".mode-btn", ACTIVE_CLASS);

      const selectedMode = target.getAttribute("data-value");

      game.mode = selectedMode ?? "Timed";

      // changes timer accordingly before starting
      if (game.mode === "Passage") timerEl.textContent = "0:00";
      if (game.mode === "Timed") timerEl.textContent = "0:60";

      if (popoverMode && "hidePopover" in popoverMode)
        popoverMode.hidePopover();
    });
  });
}

function setActiveButtons(
  clickedBtn: HTMLButtonElement,
  selectorGroup: string,
  activeClass: string[],
) {
  /*
loops over buttons from group
removes the active class from group
adds active class to the clicked button
*/

  const groupBtns = document.querySelectorAll(selectorGroup);

  groupBtns.forEach((btn) => {
    btn.classList.remove(...activeClass);
  });

  clickedBtn.classList.add(...activeClass);
}

export function syncMenuInteractiveness() {
  const menuButtons = document.querySelectorAll(".difficulty-btn, .mode-btn");

  menuButtons.forEach((btn) => {
    // if game started and not finished, disable menus
    if (game.started && !game.finished)
      btn.classList.add("pointer-events-none", "opacity-50");
    else btn.classList.remove("pointer-events-none", "opacity-50");
  });
}
