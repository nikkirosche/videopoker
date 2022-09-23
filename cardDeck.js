// 2. what buttons do we need? Draw -->  initial five cards
// 3. the five cards are now displayed
// 4. msg will pop up to ask if user wants to swap cards
// 5. users select which cards they want to hold (or swap?)
// 6. they can click on a button to execute the swap!
// 7. New cards will be dealt to them

// 2. Create a new deck and shuffle the deck
// 3. Create a "Draw" Button --> add event listener "on click" Draw five cards from Deck (can trigger step 6 here)
// 4. Select the html of the card container
// 5. For loop through the hand, and insert each one into the card container WITH event listener attached (on click)
// 6. Select the msg container --> output the msg of "ask if uses want to swap cards"
// 7. on click of each card..... we record down which ones are selected...
// 8. when user selects Swap..... we remove the marked cards and replace that many cards into their hand
//--------------------------------------------------------------------------------------------------------------

const getRandomIndex = function (cardlength) {
  return Math.floor(Math.random() * cardlength);
};

const createDeck = function () {
  const deck = [];
  const suits = ["♦", "♥", "♣", "♠"];

  for (let i = 0; i < suits.length; i += 1) {
    // make a variable of the current suit
    const currentSuit = suits[i];
    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 11, 12 ,13, 14
      if (cardName === "14") {
        cardName = "Ace";
      } else if (cardName === "11") {
        cardName = "Jack";
      } else if (cardName === "12") {
        cardName = "Queen";
      } else if (cardName === "13") {
        cardName = "King";
      }

      // make a single card object variable
      const cards = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      deck.push(cards);
    }
  }
  return deck;
};

//to shuffle deck, call shuffle deck and pass ordered current game deck
const shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

const dealCards = function (deck) {
  playerHand = [];
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(deck.pop());
  }
};
const newDeck = createDeck();
const shuffled = shuffleDeck(newDeck);
console.log(playerHand);

//Deals new set of cards to player when clicked and changes button message
drawButton.addEventListener("click", () => {
  //Displaying cards in the playerCardContainer
  playerPoints.innerText -= 1;
  drawButton.disabled = true;
  dealCards(shuffled);
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `${playerHand[i].name} ${playerHand[i].suit}`;
    cardDiv.appendChild(cardElement);
  }

  // Adding event listener to card & swap out cards
  const selectedCards = document.querySelectorAll(".card");
  for (let i = 0; i < selectedCards.length; i++) {
    selectedCards[i].addEventListener("click", () => {
      const cardElement = selectedCards[i];
      handleCardClick(cardElement, i);
    });
  }
  messageDiv.innerText = `CLICK ON THE CARDS YOU WISH TO HOLD AND CLICK 'SWAP' WHEN YOU HAVE DECIDED!`;
});

const cardSwap = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

// swap out clicked cards
const handleCardClick = (cardElement, i) => {
  if (cardSwap[i]) {
    //remove selected class here
    cardElement.classList.remove("selected");
    cardSwap[i] = false;
  } else {
    //add 'selected' class here
    cardElement.classList.add("selected");
    cardSwap[i] = true;
  }
};

swapButton.addEventListener("click", () => {
  swapButton.disabled = true;
  drawButton.classList.add("hidden");
  restartButton.classList.remove("hidden");
  const currentCards = document.querySelectorAll(".card");
  for (let i = 0; i < playerHand.length; i += 1) {
    if (cardSwap[i] === false) {
      playerHand.splice(i, 1, newDeck.pop());

      currentCards[i].innerHTML = `${playerHand[i].name} ${playerHand[i].suit}`;
    } else {
      cardSwap[i] = true;
      currentCards[i].classList.remove("selected");
    }
  }
  const condition = checkWin();
  const payouts = payoutAmount(condition);
  const totalSumMoney = getHandSum(payouts);
});
