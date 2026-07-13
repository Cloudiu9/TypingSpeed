const ACTIVE_CLASS = ["bg-blue-600", "text-white"];

export default function DropdownMenus() {
  // Display/hide menu dropdown (difficulty)
  const popoverDiff = document.querySelector("#difficulty-menu") as HTMLElement;
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  difficultyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      setActiveButtons(target, ".difficulty-btn", ACTIVE_CLASS);

      const selectedDifficulty = target.getAttribute("data-value");

      console.log(`Changed difficulty to ${selectedDifficulty}`);

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
      const target = e.currentTarget as HTMLButtonElement;
      setActiveButtons(target, ".mode-btn", ACTIVE_CLASS);

      const selectedMode = target.getAttribute("data-value");

      console.log(`Changed Mode to ${selectedMode}`);

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
