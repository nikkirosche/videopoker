// 1. Create all elements needed for initial display --> (init display: container for the game, container for msgs, container for buttons)
// 1. Initial display with buttons: to do stuff
//---------------------------------------------GLOBAL VARIABLES--------------------------------------------------//

let playerHand = [];
let currentGameDeck = [];
let playerScore = 100;
let startingBet = 1;
let scoreValue = "";
// let playerPoint = "";

const gameDeck = "empty at the start";

const mainContainer = document.createElement('div');
mainContainer.id= 'main-container';

const outputContainer = document.createElement('div');
outputContainer.id = 'output-container';

const subDiv = document.createElement('div');
subDiv.id = 'sub-div';

const playerPoints = document.createElement('div');
playerPoints.innerText = playerScore;
playerPoints.id ='player-point-container';

const messageDiv = document.createElement('div');
messageDiv.innerHTML = `PLACE YOUR BETS! </br> CLICK 'DRAW' TO BEGIN GAME WHEN DONE!`;
messageDiv.id = 'message-div';

const betContainer = document.createElement('div');
betContainer.id = 'bet-container';

const plusButton = document.createElement('button');
plusButton.innerText = '+';
plusButton.className = 'bet-button';

const betAmount = document.createElement ('div');
betAmount.id = 'bet-amount';
betAmount.innerHTML = startingBet;

const minusButton = document.createElement('button');
minusButton.innerText = '-';
minusButton.className = 'bet-button';

const playerCardContainer = document.createElement ('div');
playerCardContainer.id = 'player-card-container';

const cardDiv = document.createElement('div');

const winAmount = document.createElement('div');
winAmount.className = 'point-system';

const buttonDiv = document.createElement ('div');
buttonDiv.id = 'button-div';

const swapButton = document.createElement('button');
swapButton.innerText = 'SWAP';
swapButton.className = 'swap-button';

const drawButton = document.createElement('button');
drawButton.innerText = 'DRAW';
drawButton.className = 'draw-button';

const restartButton =document.createElement('button');
restartButton.innerText = 'RESTART';
restartButton.className = 'draw-button';
restartButton.classList.add("hidden");


buttonDiv.append(drawButton, restartButton, swapButton);
playerCardContainer.append(cardDiv, buttonDiv);
betContainer.append(minusButton, betAmount, plusButton);
subDiv.append(messageDiv, playerPoints);
outputContainer.append(playerCardContainer,subDiv, betContainer);
mainContainer.append(winAmount, outputContainer);
document.body.append(mainContainer);








