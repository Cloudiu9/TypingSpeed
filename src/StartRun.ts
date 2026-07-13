export default function StartRun() {
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
}
