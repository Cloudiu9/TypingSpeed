const resultsSection = document.querySelector("#results");
const mainSection = document.querySelector("#wrapper-main");
const restartBtn = document.querySelector("#results-restart-btn");

export default function ShowResults() {
  restartBtn?.addEventListener("click", () => {
    resultsSection?.classList.add("hidden");
    mainSection?.classList.remove("hidden");
  });
}
