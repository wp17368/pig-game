'use strict';
const startNewGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');
const playerZeroSection = document.querySelector('.player--0');
const playerOneSection = document.querySelector('.player--1');

let diceRollResult;
let players;
let gameWon;

rollDiceButton.addEventListener('click', rollTheDice);
holdButton.addEventListener('click', holdCurrentScore);
startNewGameButton.addEventListener('click', startNewGame);

function createNewPlayer(active) {
  return {
    score: 0,
    currentScore: 0,
    active: active,
  };
}
function addDomElementsToPlayersObjects() {
  for (let i = 0; i < players.length; i++) {
    players[i].sectionDomElement = document.querySelector(`.player--${i}`);
    players[i].scoreDomElement = document.querySelector(`#score--${i}`);
    players[i].currentScoreDomElement = document.querySelector(
      `#current--${i}`
    );
  }
}
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
  players[0].active = !players[0].active;
  players[1].active = !players[1].active;
  getActivePlayer().sectionDomElement.classList.add('player--active');
  getInactivePlayer().sectionDomElement.classList.remove('player--active');
}
function generateRandomNumber(minNumber, maxNumber) {
  return Math.floor(Math.random() * maxNumber + minNumber);
}
function resetCurrentScore(player) {
  player.currentScore = 0;
}
function resetPlayers() {
  players = [createNewPlayer(true), createNewPlayer(false)];
  addDomElementsToPlayersObjects();
}
function resetVictory() {
  if (gameWon) {
    toggleButtons();
    gameWon = false;
  }
  gameWon = false;
}
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
function changeCurrentScore(player) {
  if (diceRollResult != 1) {
    player.currentScore += diceRollResult;
  } else {
    resetCurrentScore(player);
  }
}
function changeScore(player) {
  player.score += player.currentScore;
}
function displayCurrentScore(player) {
  player.currentScoreDomElement.innerHTML = `${player.currentScore}`;
}
function holdCurrentScore() {
  let player = getActivePlayer();
  changeScore(player);
  displayNewScore(player);
  resetCurrentScore(player);
  displayCurrentScore(player);
  didPlayerWin(player);
  toggleActivePlayer();
}
function didPlayerWin(player) {
  if (player.score >= 100) {
    toggleButtons();
    gameWon = true;
  }
}
function displayNewScore(player) {
  player.scoreDomElement.innerText = player.score;
}
function toggleButtons() {
  rollDiceButton.classList.toggle('hidden');
  holdButton.classList.toggle('hidden');
}
function startNewGame() {
  resetPlayers();
  displayCurrentScore(getActivePlayer());
  displayNewScore(getActivePlayer());
  displayCurrentScore(getInactivePlayer());
  displayNewScore(getInactivePlayer());
  resetVictory();
}
startNewGame();
