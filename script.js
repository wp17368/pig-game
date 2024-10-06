'use strict';
const startNewGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');
const playerZeroSection = document.querySelector('.player--0');
const playerOneSection = document.querySelector('.player--1');

function createNewPlayer(name) {
  return {
    name: name,
    score: 0,
    currentScore: 0,
    active: true,
  };
}

let diceRollResult;
let players = [createNewPlayer('playerZero'), createNewPlayer('playerOne')];
function addDomElementsToPlayersObjects() {
  for (let i = 0; i < players.length; i++) {
    players[i].sectionDomElement = document.querySelector(`.player--${i}`);
    players[i].scoreDomElement = document.querySelector(`#score--${i}`);
    players[i].currentScoreDomElement = document.querySelector(
      `#current--${i}`
    );
  }
}
addDomElementsToPlayersObjects();

function getActivePlayer() {
  if (players[0].active) {
    return players[0];
  } else {
    return players[1];
  }
}
function getInactivePlayer() {
  if (players[0].active) {
    return players[1];
  } else {
    return players[0];
  }
}
function toggleActivePlayer() {
  if (players[0].active) {
    players[0].active = false;
    players[1].active = true;
  } else {
    players[1].active = false;
    players[0].active = true;
  }
  getActivePlayer().sectionDomElement.classList.toggle('player--active');
  getInactivePlayer().sectionDomElement.classList.toggle('player--active');
}
function generateRandomNumber(minNumber, maxNumber) {
  return Math.floor(Math.random() * maxNumber + minNumber);
}
// startNewGameButton.addEventListener('click');
rollDiceButton.addEventListener('click', rollTheDice);
holdButton.addEventListener('click', holdCurrentScore);

function rollTheDice() {
  diceRollResult = generateRandomNumber(1, 6);
  displayDiceNumber(diceRollResult);
  changeCurrentScore(getActivePlayer());
  displayCurrentScore(getActivePlayer());
  if (getActivePlayer().currentScore === 0) {
    toggleActivePlayer();
  }
}
function displayDiceNumber(diceRollResult) {
  diceImage.src = `dice-${diceRollResult}.png`;
}
function changeCurrentScore(activePlayer) {
  if (diceRollResult != 1) {
    activePlayer.currentScore += diceRollResult;
  } else {
    activePlayer.currentScore = 0;
  }
}
function displayCurrentScore(activePlayer) {
  activePlayer.currentScoreDomElement.innerHTML = `${activePlayer.currentScore}`;
}
function holdCurrentScore() {
  getActivePlayer().score += getActivePlayer().currentScore;
  displayNewScore(getActivePlayer());
  getActivePlayer().currentScore = 0;
  displayCurrentScore(getActivePlayer());
  toggleActivePlayer();
}
function displayNewScore(activePlayer) {
  activePlayer.scoreDomElement.innerText = activePlayer.score;
}
