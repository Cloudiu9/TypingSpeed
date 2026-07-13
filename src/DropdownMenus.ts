export default function DropdownMenus() {
  // Display/hide menu dropdown (difficulty)
  const popoverDiff = document.querySelector("#difficulty-menu") as HTMLElement;
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  difficultyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const selectedDifficulty = target.getAttribute("data-value");

      console.log(`Changed difficulty to ${selectedDifficulty}`);

      if (popoverDiff && typeof (popoverDiff as any).hidePopover === "function")
        (popoverDiff as any).hidePopover();
    });
  });

  // Display/hide menu dropdown (mode)
  const popoverMode = document.querySelector("#mode-menu") as HTMLElement;
  const modeButtons = document.querySelectorAll(".mode-btn");

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const selectedMode = target.getAttribute("data-value");

      console.log(`Changed Mode to ${selectedMode}`);

      if (popoverMode && typeof (popoverMode as any).hidePopover === "function")
        (popoverMode as any).hidePopover();
    });
  });
}
