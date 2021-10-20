/*----------------- Constants -----------------*/
const winSound = new Audio("../audio/galaxy.mp3");

/*------------- Variables (state) -------------*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let active = false;
let count, timeLeft;

/*--------- Cached Element References ---------*/
const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector("#resetBtn");
const lightDarkBtn = document.querySelector("#light-dark-button");
const timerEl = document.getElementById("timer");
const header = document.querySelector("#header");
const countdownEl = document.getElementById("countdown");

/*-------------- Event Listeners --------------*/
resetBtn.addEventListener("click", resetGame);
lightDarkBtn.addEventListener("click", toggleLightDark);

/*----------------- Functions -----------------*/
resetGame();

function flipCard() {
  if (!active) return;
  if (lockBoard) return;
  if (this === firstCard) return;

  if (countdownEl.textContent === "") {
    timer();
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // in the first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // in the second click
    secondCard = this;

    checkForMatch();
    winCondition();
  }
}

function winCondition() {
  let didWin = true;
  cards.forEach((card) => {
    if (!card.classList.contains("flip")) {
      didWin = false;
    }
  });

  if (didWin) {
    // make some music
    winSound.volume = 0.2;
    winSound.play();

    countdownEl.textContent = "WELL DONE YOUNG JEDI!";
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function toggleLightDark() {
  document.body.className =
    document.body.className === "dark-mode" ? "" : "dark-mode";
  header.className =
    header.className === "page-title-dark-mode"
      ? "page-title"
      : "page-title-dark-mode";
}

function timer() {
  clearInterval(count);
  timeLeft = 60;

  count = setInterval(function () {
    countdownEl.textContent = timeLeft + " seconds remaining.";
    timeLeft -= 1;
    if (timeLeft < 0) {
      countdownEl.textContent = "THE DARK SIDE HAS BEEN DETECTED IN YOU!";
      active = false;
    }
  }, 1000);
}

function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  resetBoard();
  shuffle();
  clearInterval(count);
  countdownEl.textContent = "";
  active = true;
}