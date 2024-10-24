import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");
var backgroundElems = document.querySelectorAll(
  "img.background[data-background]"
);

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", 300);
}

export function setupBackGround() {
  setCustomProperty(backgroundElems[0], "--left", 0);
  setCustomProperty(backgroundElems[1], "--left", 300);
}

export function updateGround(delta, speedScale) {
  groundElems.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);

    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}

export function updateBackGround(delta, speedScale) {
  backgroundElems.forEach((background) => {
    incrementCustomProperty(
      background,
      "--left",
      delta * speedScale * SPEED * -1
    );

    if (getCustomProperty(background, "--left") <= -100) {
      incrementCustomProperty(background, "--left", 100);
    }
  });
}
