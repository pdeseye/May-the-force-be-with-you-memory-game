const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;


function flipCard() {
  this.classList.toggle('flip');

  if(!hasFlippedCard) {
    // in the first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // in the second click
    hasFlippedCard = false;
    secondCard = this;

    //cards match?
    console.log(firstCard.dataset.framework);
    console.log(secondCard.dataset.framework);
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));