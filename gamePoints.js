// 8. tabulate the points
// 9. msg output of how much you win or lst
// 10. restart the game!
// 9. run playerHand through calcHandScore function --> Tabulate points
// 10. Determine how much a player has won or lost
// 11. restart the game

//------------------------------------------------------------------------------------------
// List of win conditions & payouts
const winConditions = {
  "STRAIGHT FLUSH": 50,
  "FOUR OF A KIND": 30,
  "FULL HOUSE": 20,
  "FLUSH": 10,
  "STRAIGHTS": 8,
  "THREE OF A KIND": 6,
  "TWO PAIR": 3,
  "JACKS OR BETTER": 1,
};

const setPointsWithMultiple = (multiple) => {
  const targetContainer = document.getElementsByClassName("point-system");
  targetContainer[0].innerHTML = "";
  console.log(targetContainer);

  Object.keys(winConditions).forEach(function (key) {
    const scoreContainer = document.createElement("div");
    scoreContainer.className = "scoring-system";
    let scoreKey = document.createElement("p");
    let scoreValue = document.createElement("p");
    scoreKey.innerHTML = key;
    scoreValue.innerHTML = winConditions[key] * multiple;
    scoreContainer.appendChild(scoreKey);
    scoreContainer.appendChild(scoreValue);
    targetContainer[0].appendChild(scoreContainer);
  });
};

Object.keys(winConditions).forEach(function (key) {
  const scoreContainer = document.createElement("div");
  scoreContainer.className = "scoring-system";
  let scoreKey = document.createElement("p");
  let scoreValue = document.createElement("p");
  scoreKey.innerHTML = key;
  scoreValue.innerHTML = winConditions[key];
  scoreContainer.appendChild(scoreKey);
  scoreContainer.appendChild(scoreValue);
  winAmount.appendChild(scoreContainer);
});

// 100 Points starting
// increase bet by 1
const risingBet = () => {
  if (startingBet > 1) {
    minusButton.disabled = false;
  }
  playerScore -= 1;
  startingBet += 1;
  setPointsWithMultiple(startingBet);
  playerPoints.innerText = playerScore;
  betAmount.innerText = startingBet;
  console.log(startingBet);

  if (startingBet === 3) {
    plusButton.disabled = true;
  }
};

plusButton.addEventListener("click", risingBet);

// decrease bet by 1
minusButton.addEventListener("click", () => {
  if (startingBet <= 3) {
    plusButton.disabled = false;
  }
  playerScore += 1;
  startingBet -= 1;
  setPointsWithMultiple(startingBet);
  playerPoints.innerText = playerScore;
  betAmount.innerText = startingBet;

  if (startingBet <= 1) {
    minusButton.disabled = true;
  }
});

//----------------------------------------------CHECK WIN--------------------------------------------//
// Check for player's winning cards & display winning amount on message output
const checkWin = () => {
  let checkWinCondition;
  //conditions checkers
  const matchArray = [];
  let straightCond = true;
  let flushCond = true;
  let royalCond = true;

  //sort the cards
  playerHand.sort((a, b) => a.rank - b.rank);
 
  // loop through entire hand
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    // if find a match, push to matchArray
    if (playerHand[i].rank === playerHand[i + 1].rank) {
      matchArray.push(playerHand[i].rank);
    }
    // check for flush
    if (playerHand[i].suit !== playerHand[i + 1].suit) {
      flushCond = false;
    }
    // check for straight
    if (playerHand[i].rank !== playerHand[i + 1].rank - 1) {
      straightCond = false;
    }
  }

  if (matchArray.length === 0 && straightCond === true && flushCond === true) {
    checkWinCondition = "STRAIGHT FLUSH";
  } else if (
    matchArray.length === 3 &&
    matchArray[0] === matchArray[1] &&
    matchArray[0] === matchArray[2]
  ) {
    checkWinCondition = "FOUR OF A KIND";
  } else if (
    matchArray.length === 3 &&
    (matchArray[0] !== matchArray[1] || matchArray[0] !== matchArray[2])
  ) {
    checkWinCondition = "FULL HOUSE";
  } else if (
    matchArray.length === 0 &&
    flushCond === true &&
    straightCond === false
  ) {
    checkWinCondition = "FLUSH";
  } else if (
    matchArray.length === 0 &&
    straightCond === true &&
    flushCond === false
  ) {
    checkWinCondition = "STRAIGHT";
  } else if (matchArray.length === 2 && matchArray[0] === matchArray[1]) {
    checkWinCondition = "THREE OF A KIND";
  } else if (matchArray.length === 2 && matchArray[0] !== matchArray[1]) {
    checkWinCondition = "TWO PAIR";
  } else if (
    (matchArray.length === 0 || matchArray.length === 1) &&
    (playerHand[0].rank === 1 || playerHand[4].rank > 10)
  ) {
    checkWinCondition = "JACKS OR BETTER";
  } else {
    checkWinCondition = "YOU LOSE";
  }
  console.log(`Hand Condition: ${checkWinCondition}`);

  return checkWinCondition;
};

//-------------------------------------------PAYOUTS-------------------------------------------//

//link betAmount multiplier with individual win conditions
const payoutAmount = (condition) => {
  scoreValue = winConditions[condition];
  let payoutCondition;
  if (condition === "STRAIGHT FLUSH") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "FOUR OF A KIND") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "FULL HOUSE") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "FLUSH") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "STRAIGHT") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "THREE OF A KIND") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "TWO PAIR") {
    payoutCondition = startingBet * scoreValue;
  } else if (condition === "JACKS OR BETTER") {
    payoutCondition = startingBet * scoreValue;
  } else {
    payoutCondition = 0;
  }
  messageDiv.innerHTML = `${condition}! </br> YOU WON 💰${payoutCondition}!</br> CLICK 'RESTART' TO PLAY AGAIN!`;
  return payoutCondition;
};

//Total the points
const getHandSum = (payouts) => {
  playerScore += payouts;
  playerPoints.innerText = playerScore
};

// Restart game when button clicked
restartButton.addEventListener("click", (event) => {
//clear playerDeck
currentGameDeck = [];
playerHand = [];
cardDiv.innerHTML = "";
//change Button to draw
drawButton.classList.remove("hidden");
restartButton.classList.add("hidden");
drawButton.disabled = false;
swapButton.disabled = false;
//drawButton.addEventListener = ('click', (event));

//reset Bet
betAmount.innerHTML = 1;
plusButton.disabled = false;
minusButton.disabled = false;
startingBet = 1;
  });
  
  

