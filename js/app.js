const cards = document.querySelectorAll('.memory-card');
const resetBtn = document.querySelector("#resetBtn");
const lightDarkBtn = document.querySelector("#light-dark-button")

const header = document.querySelector("#header")

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if(!hasFlippedCard) {
    // in the first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // in the second click
    secondCard = this;

    checkForMatch ();
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unflipCards ();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  console.log('running')
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

resetBtn.addEventListener('click', resetGame);
lightDarkBtn.addEventListener("click", toggleLightDark)

function toggleLightDark() {
  document.body.className = document.body.className === "dark-mode" ? "" : "dark-mode" 
  header.className = header.className === "page-title-dark-mode" ? "page-title" : "page-title-dark-mode"
}



function resetGame() {
  cards.forEach(card => {
 
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  resetBoard()
  shuffle()
}
resetGame()