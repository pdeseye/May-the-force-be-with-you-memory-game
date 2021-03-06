/*----------------- Constants -----------------*/
const winSound = new Audio("../audio/galaxy.mp3");

/*------------- Variables (state) -------------*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let active = false;
let count, timeLeft;
let winCount = 0;

/*--------- Cached Element References ---------*/
const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector("#resetBtn");
const lightDarkBtn = document.querySelector("#lightDarkBtn");
const header = document.querySelector("#header");
const countDownEl = document.getElementById("countDown");
const winCountEl = document.getElementById("winCount");
const nextLevelBtn = document.querySelector("#nextLevelBtn");

/*-------------- Event Listeners --------------*/
resetBtn.addEventListener("click", resetGame);
lightDarkBtn.addEventListener("click", toggleLightDark);
nextLevelBtn.addEventListener("click", nextLevel);

/*----------------- Functions -----------------*/
resetGame(0);

function flipCard() {
  if (!active) return;
  if (lockBoard) return;
  if (this === firstCard) return;

  if (countDownEl.textContent === "") {
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

    clearInterval(count);

    if (winCount >= 1) {
      winCountEl.textContent = "You are now a Jedi!!!!";
      countDownEl.textContent = "";
    } else {
      countDownEl.textContent = "WELL DONE YOUNG JEDI!";
      winCount = winCount + 1; // keeps track of wins
      nextLevelBtn.removeAttribute("hidden");
    }
  }
}

function nextLevel() {
  resetGame(winCount);
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
    let randomPos = Math.floor(Math.random() * 24);
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
  timeLeft = 120 - winCount * 5;

  count = setInterval(function () {
    countDownEl.textContent = timeLeft + " seconds remaining.";
    timeLeft -= 1;
    if (timeLeft < 0) {
      countDownEl.textContent =
        "IM JUST GOING TO CALL YOU JAR JAR BINKS! BETTER LUCK NEXT TIME!";
      active = false;
    }
  }, 1000);
}

function resetGame(resetWinCount) {
  if (Number.isFinite(resetWinCount)) {
    winCount = resetWinCount;
  } else {
    winCount = 0;
  }
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  let level = winCount + 1;
  nextLevelBtn.setAttribute("hidden", true);
  resetBoard();
  shuffle();
  clearInterval(count);
  countDownEl.textContent = "";
  winCountEl.textContent = "Current Level: " + level;
  active = true;
  winSound.pause();
  winSound.currentTime = 0;
}

