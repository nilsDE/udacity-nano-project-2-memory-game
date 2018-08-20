// Array with all different cards

let allCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor',
                'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf',
                'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf',
                'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o',
                'fa-cube'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/*****************************************
Function to update HTML with updated cards
*****************************************/
function updateHTML() {
  //Remove the existing child elements:
  const myNode = document.querySelector('.deck');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  };
  //Create and append new child elements:
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 16; i++) {
    const newElement = document.createElement('li');
    newElement.classList.add('card');
    const htmlTextToAdd = '<i class="fa ' + allCards[i] + '"></i>';
    newElement.insertAdjacentHTML('beforeend', htmlTextToAdd);
    fragment.appendChild(newElement);
  };
  myNode.appendChild(fragment);
};

/***************
Reset function
***************/
function resetGame() {
  //Shuffle the cards and update its HTML code
  allCards = shuffle(allCards);
  updateHTML();
  //Reset the move counter
  const counterElement = document.querySelector('.moves');
  counterElement.textContent = 0;
  //Reset the stars
}
// Event Listener for Reset
const resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', resetGame);

/*****************************************************
Event listener that listens for cards being clicked on
*****************************************************/
const myDeck = document.querySelector('.deck');

function responseToClick(event) {
  //increase counter 'moves'
  const counterElement = document.querySelector('.moves');
  counterElement.textContent = Number(counterElement.textContent) + 1;

  //open the card
  event.target.classList.add('show', 'open');

  //check what card it is
  const listOfClasses = event.target.firstElementChild.className.split(' ');
  const cardClass = listOfClasses[1];
  console.log(cardClass);
};

myDeck.addEventListener('click', responseToClick);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
