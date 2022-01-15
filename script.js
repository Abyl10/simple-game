'use strict';

const player0E = document.querySelector('.player--0');
const player1E = document.querySelector('.player--1');
const score0E = document.getElementById('score--0');
const score1E = document.getElementById('score--1');
const currentScore0E = document.getElementById('current--0');
const currentScore1E = document.getElementById('current--1');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll'); 
const holdBtn = document.querySelector('.btn--hold'); 
const diceE = document.querySelector('.dice');

let currScore, totalScore, activePlayer, playing; 

function init() {
	currScore = 0; 
	activePlayer = 0;
	totalScore = [0,0]; 
	playing = true;

	score0E.textContent = 0;
	score1E.textContent = 0;
	currentScore0E.textContent = 0;
	currentScore1E.textContent = 0;

	player0E.classList.remove('player--winner');
	player1E.classList.remove('player--winner');
	player0E.classList.add('player--active');
	player1E.classList.remove('player--active');
	diceE.classList.add("hidden");
}

init();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = (activePlayer === 0) ? 1 : 0; 
	currScore = 0; 
	player0E.classList.toggle("player--active");
	player1E.classList.toggle("player--active");
}

rollDiceBtn.addEventListener('click', function() {
	if (playing) {
		let roll = Math.floor(Math.random() * 6) + 1;
		diceE.classList.remove('hidden');
		diceE.src = `dice-${roll}.png`; 
		if (roll != 1) {
			currScore += roll; 
			document.getElementById(`current--${activePlayer}`).textContent = currScore; 
		}
		else {
			switchPlayer(); 
		}
	}
});

holdBtn.addEventListener('click', function() {
	if (playing) {
		//add current score to active player's score
		totalScore[activePlayer] += currScore; 
		document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer]; 
		//check if score is >= 100, finish the game;
		if (totalScore[activePlayer] >= 100) {
			playing = false;
			diceE.classList.add('hidden');
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

		}
		else {
			//switch player;
			switchPlayer();
		}
	}
});

newGameBtn.addEventListener('click', init);