const cards = document.querySelectorAll('.memory-card');

const game = document.querySelector('.memory-game');

const win = document.querySelector('.win')

let hasFlippedCard = false;

let firstCard, secondCard;

let lockBoard = false;

let flippedCards = document.querySelectorAll('.flip');

let winAudio = new Audio("audio/win.mp3")

function flipCard() {
   if (lockBoard) return;
   if (this === firstCard) return;
   this.classList.add('flip');

   if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
      return;
   }
   // second click
   secondCard = this;
   checkForMatch();
}

function checkForMatch() {
   let isMatch = firstCard.dataset.city === secondCard.dataset.city ? disableCards() : unFlipCards() 
}

function disableCards() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard)
   resetBoard();
}

function unFlipCards() {
   lockBoard = true;
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
   }, 1000);
}

function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

(function shuffle() {
   cards.forEach (card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
   })
})();

function checkWin() {  
   if (document.querySelectorAll('.flip').length === 12) {
      setInterval(() => {
         game.style.display = 'none';
         win.style.display = 'flex';
         winAudio.play()
      }, 1000);
   }
}

cards.forEach(card => card.addEventListener('click', flipCard));

cards.forEach(card => card.addEventListener('click', checkWin));
