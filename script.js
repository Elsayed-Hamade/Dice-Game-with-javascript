/* IMPORTING */

// Scores
const score0 = document.querySelector(".score-0");
const score1 = document.querySelector(".score-1");
const currentScore0 = document.querySelector(".current-score-0");
const currentScore1 = document.querySelector(".current-score-1");

// Buttons
const again = document.querySelector(".again");
const roll = document.querySelector(".roll");
const hold = document.querySelector(".hold");

// Dice
const diceImg = document.querySelector(".dice");

// Players
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

/* Declare Main Variables */
let currentScore, playing, scores, activePlayer;
// Initial Settings
const init = () => {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.add("playing");
  player1.classList.remove("playing");
  diceImg.classList.add("hidden");
};

init();

// Switch players
const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`.current-score-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("playing");
  player1.classList.toggle("playing");
};

/* Functionality */
roll.addEventListener("click", () => {
  if (playing) {
    number = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove("hidden");
    diceImg.src = `Assets/dice-${number}.png`;
    if (number !== 1) {
      currentScore += number;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer()
    }
  }
});

hold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`player-${activePlayer}`)
        .classList.remove("playing");
    }
    switchPlayer();
  }
});

again.addEventListener("click", () => {
  document.querySelector(`.player-${activePlayer}`).classList.remove("winner");
  init()
});
