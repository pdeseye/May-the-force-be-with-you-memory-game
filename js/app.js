const cards = document.querySelectorAll('.memory-card');

function flipCard() {
  console.log('click')
  console.log(this);
}

cards.forEach(card => card.addEventListener('click', flipCard));