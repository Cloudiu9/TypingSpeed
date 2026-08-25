import { game } from "./GameLogic";

export default function handleStorage() {
  const pbValue = localStorage.getItem("pb");

  // store PB in local storage to persist between reloads
  if (game.finished) localStorage.setItem("pb", String(game.PB));

  //   on fresh reload, get PB from storage
  if (pbValue !== null && game.PB === 0) {
    game.PB = +pbValue;
  }
}
