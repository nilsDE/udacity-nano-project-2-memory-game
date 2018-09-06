/****************
Global Variables
****************/
let openCards = [];
let numberMoves = 0;
let matchedCards = 0;
let numberStars = 3;

// Array with all different cards
let allCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor',
  'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf',
  'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf',
  'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o',
  'fa-cube'
];

/********************************************************
Shuffle function from http://stackoverflow.com/a/2450976
********************************************************/
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

//initial shuffle
allCards = shuffle(allCards);
updateHTML();

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
  //Reset the stars
  const starsDisplay = document.querySelector('.stars');
  const htmlToAddStars = '<li><i class="fa fa-star"></i></li>';
  if (numberMoves >= 30) {
    starsDisplay.insertAdjacentHTML('beforeend', htmlToAddStars);
    starsDisplay.insertAdjacentHTML('beforeend', htmlToAddStars);
  } else if (numberMoves >= 15) {
    starsDisplay.insertAdjacentHTML('beforeend', htmlToAddStars);
  };
  numberStars = 3;

  //Reset the move counter
  const counterElement = document.querySelector('.moves');
  counterElement.textContent = 0;
  numberMoves = 0;

  //Empty open cards
  openCards = [];

  //Reset time
  document.querySelector('.count-seconds').textContent = 0;
  document.removeEventListener("click", startClock, {once: true});
  document.addEventListener("click", startClock, {once: true});
};

// Event Listener for Reset
const resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', resetGame);

/******************
Keep track of time
******************/
let intervalID;

function startClock() {
  intervalID = setInterval(updateTime, 1000);
}

function updateTime() {
  const timeElement = document.querySelector('.count-seconds');
  timeElement.textContent = Number(timeElement.textContent) + 1;
};

document.addEventListener("click", startClock, {once: true});



/*****************************************************
Event listener that listens for cards being clicked on
*****************************************************/
const myDeck = document.querySelector('.deck');

function responseToClick(event) {
  // if statement to prevent that more than 2 cards are open at the same time
  if (openCards.length < 2) {
    //increase counter 'moves'
    if (event.target.nodeName == 'LI' && (event.target.classList.value.includes('open') == false)) {
      const counterElement = document.querySelector('.moves');
      counterElement.textContent = Number(counterElement.textContent) + 1;
      numberMoves++;

      /*decrease the stars if necessary
      After 15 moves remove a star
      After 30 moves remove a star
      */
      const starElement = document.querySelector('.stars');
      if (numberMoves == 15 || numberMoves == 30) {
        starElement.removeChild(starElement.firstElementChild);
        numberStars -= 1;
      };

      //open the card and push into open cards array
      event.target.classList.add('show', 'open');
      openCards.push(event.target);
    };

    //check if there are two open cards that need to be compared and compare them
    //add or remove classes accordingly
    if (openCards.length == 2) {
      let cardOneClasses = openCards[0].firstElementChild.className.split(' ');
      let cardOne = cardOneClasses[1];
      let cardTwoClasses = openCards[1].firstElementChild.className.split(' ');
      let cardTwo = cardTwoClasses[1];
      if (cardOne == cardTwo) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = [];
        matchedCards += 2;
        if (matchedCards == 16) {
          showModal();
          clearInterval(intervalID);
        };
      } else {
        setTimeout(function removeClasses() {
          openCards[0].classList.remove('open', 'show');
          openCards[1].classList.remove('open', 'show');
          openCards = [];
        }, 1500);
      }
    }
  }
};

myDeck.addEventListener('click', responseToClick);


/************************
Modal for winning message
************************/
//Select the modal and the text of the modal
let modal = document.querySelector('#myModal');
let modalText = document.querySelector('.text-modal');

//Function to change the text of the modal and open it
let showModal = function() {
  let newTextOfModal = `It took you ${numberMoves} moves and ${document.querySelector('.count-seconds').textContent} seconds to win the game! ` +
                        `You have been awarded ${numberStars} star(s)!`;
  modalText.textContent = newTextOfModal;
  modal.style.display = "block";
};

//Select the button that resets the game
var btn = document.getElementById("myBtn");

btn.onclick = function() {
    modal.style.display = "none";
    resetGame();
};


/*
Restore stars when resetting the game - ok but formatting is not 100%
Show final message - create a modal - ok but ugly
timer cannot be reset
*/
