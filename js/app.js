const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;


function flipCard() {
  this.classList.toggle('flip');

  if(!hasFlippedCard) {
    // in the first click
    hasFlippedCard = true;
    firstCard = this;

    console.log({hasFlippedCard, firstCard})
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));