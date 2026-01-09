let playerScore = 0;
let computerScore = 0;
let maxRounds = 5;
let gameActive = false;

const pScore = document.getElementById('playerScore');
const cScore = document.getElementById('computerScore');
const compSelect = document.getElementById('computerSelect');
const playerSelect = document.getElementById('playerSelect');
const message = document.getElementById('message');


function computerPlay() {
  let arr = [1, 2, 3];
  let random = arr[Math.floor(Math.random() * arr.length)];
  let value;
  switch (random) {
    case 1:
      value = 'rock';
      break;
    case 2:
      value = 'paper';
      break;
    default:
      value = 'scissors';
  }
  return value;
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 'Draw!';
  } else if ((playerSelection == "rock") && (computerSelection == "scissors")) {
    return "Player won!";
  } else if ((playerSelection == "paper") && (computerSelection == "rock")) {
    return "Player won!";
  } else if ((playerSelection == "scissors") && (computerSelection == "paper")) {
    return "Player won!";
  } else if ((playerSelection == "paper") && (computerSelection == "scissors")) {
    return "Computer won!";
  } else if ((playerSelection == "scissors") && (computerSelection == "rock")) {
    return "Computer won!";
  } else if ((playerSelection == "rock") && (computerSelection == "paper")) {
    return "Computer won!";
  }
}

function gameFlow(playerSelection) {
  const winner = selection(playerSelection);
  const result = winner.winner;
  const compMov = winner.compMove;
  displaySelection('player', playerSelection, result);
  displaySelection('computer', compMov, result);
  scoreBoard(result);
  message.innerText = result;
  whoWon();
  reset();
}

function selection(playerSelection) {
  let computer = computerPlay();
  let winner = playRound(playerSelection, computer)
  return {
    winner: winner,
    compMove: computer
  };
}

function displaySelection(player, selection, result) {
  if (player === 'player') {
    playerSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`;
    if (result === "Player won!") {
      playerSelect.style.color = 'green';
      compSelect.style.color = 'red';
    }
  } else {
    compSelect.innerHTML = `<i class="fas fa-hand-${selection}"></i>`;
    if (result === "Computer won!") {
      compSelect.style.color = 'green';
      playerSelect.style.color = 'red';
    }
  }
  if (result === 'Draw!') {
    compSelect.style.color = '';
    playerSelect.style.color = '';
  }
}

function scoreBoard(result) {
  if (result === "Player won!") {
    playerScore++;
    pScore.innerText = playerScore;
    cScore.innerText = computerScore;
  } else if (result === "Computer won!") {
    computerScore++;
    pScore.innerText = playerScore;
    cScore.innerText = computerScore;
  } else {
    return false;
  }
}

function endGame() {
  if (playerScore === maxRounds || computerScore === maxRounds) {
    return true;
  } else {
    return false;
  }
}



function whoWon() {
  if (endGame()) {
    document.getElementById('playAgain-button').style.display = 'inline-block';
    if (playerScore === maxRounds) {
      message.innerText = 'Player is the Winner! Congratulations!'
    } else {
      message.innerText = 'Computer is the Winner! You Lose!'
    }
  }
}

function reset() {
  if (endGame()) {
    setTimeout(function(){
      playerScore = 0;
      computerScore = 0;
      compSelect.innerHTML = '';
      playerSelect.innerHTML = '';
      pScore.innerText = playerScore;
      cScore.innerText = computerScore;
      gameActive = false;
    }, 3000);    
  }
}

function displayBoards() {
  const start = document.getElementById('start');
  const boards = document.getElementById('boards');
  const select = document.getElementById('select');
  start.style.display = 'none';
  boards.style.display = 'block';
  select.style.display = 'block';
  gameActive = true;
}
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

const buttons = document.getElementsByClassName('game-mode');

for (let btn of buttons) {
  btn.addEventListener('click', function() {
    maxRounds = Number(btn.getAttribute('data-rounds')); 
    displayBoards();
  });
}


rock.addEventListener('click', gameFlow.bind(this, rock.id));
paper.addEventListener('click', gameFlow.bind(this, paper.id));
scissors.addEventListener('click', gameFlow.bind(this, scissors.id));