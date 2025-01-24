const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleClick = (event) => {
  const index = event.target.getAttribute('data-index');
  
  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  
  if (checkWinner()) {
    gameActive = false;
    statusText.textContent = `${currentPlayer} wins!`;
  } else if (gameBoard.every(cell => cell !== null)) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
  }
};

const checkWinner = () => {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
};

const restartGame = () => {
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's turn";
  squares.forEach(square => square.textContent = '');
};

squares.forEach(square => square.addEventListener('click', handleClick));

restartBtn.addEventListener('click', restartGame);