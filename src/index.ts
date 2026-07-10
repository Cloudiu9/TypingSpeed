// Hiding overlay and starting race
const btnStart = document.querySelector<HTMLButtonElement>("#start");
const timerEl = document.querySelector<HTMLSpanElement>("#timer");
const overlayEl = document.querySelector<HTMLDivElement>("#overlay");

function startRun() {
  let SECONDS = 5;
  // hide overlay
  overlayEl?.classList.add("hidden");

  // start clock
  const timer = setInterval(() => {
    SECONDS--;
    if (timerEl && SECONDS >= 0) {
      timerEl.textContent = "0:" + `${SECONDS}`.padStart(2, "0");
    }

    if (SECONDS < 0) {
      clearInterval(timer);
      alert("You type X WPM");
      // TODO After confirming the alert/button that pops up, reset everything? ==> randomize text, add overlay back, reset timer
    }
  }, 1000);
}

btnStart?.addEventListener("click", startRun);

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
