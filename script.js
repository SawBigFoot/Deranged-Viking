import { updateGround, setupGround } from "./ground.js";
import { updateBackGround, setupBackGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";


let backgroundElems = document.querySelectorAll("img.background[data-background]");


const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 20;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let loopscore50 = 1;
let loopscore100 = 1;
let loopscore150 = 1;

let lastTime;
let speedScale;
export let score;

function update(time) {
if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateBackGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);

  console.log(score);
  console.log(delta);
  let loopimagetree2 = 1
  let loopfortree4 = 0
  var characterchange = 0

  if (score >= 50) {
    if (loopfortree4) {
        characterchange = 1
    }
    if (loopimagetree2) {
        console.log("Passed 50") 
        backgroundElems.forEach(elem => {
        elem.src = "imgs/Tree2.png";
        if (score >= 100)
            loopimagetree2 = false
    }); 
    if (loopimagetree2 == false) {
        console.log("Passed 100") 
        backgroundElems.forEach(elem => {
        elem.src = "imgs/Tree.png";
        if (score >= 150) {
            loopfortree4 = 1
        }
    });
    }
    }
}
  if (score >= 50 && loopscore50) {
    loopscore50 = 0;
    // background.style.backgroundImage = "url('imgs/Tree.png')";
  }
  if (score >= 100 && loopscore100);
  {
    loopscore100 = 0;
  }
  if (score >= 150 && loopscore150);
  {
    loopscore150 = 0;
  }
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  startScreenElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreenElem.classList.remove("hide");
  }, 100);
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
