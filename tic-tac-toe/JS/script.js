// constants
const X_CLASS = "x";
const O_CLASS = "o";
const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// grab relevant elements
const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const modal = document.querySelector(".winner-message");
const closeModalElement = document.querySelector(".close-modal");
const resetButton = document.querySelector(".reset");
const winnerMessage = document.querySelector(".message");

closeModalElement.addEventListener("click", closeModal);
resetButton.addEventListener("click", game);

function closeModal() {
  modal.classList.remove("show");
}

function openModal() {
  modal.classList.add("show");
}

// track turns
let xTurn;
let winner;

// init game
function game() {
  closeModal();
  xTurn = true;
  winner = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.addEventListener("click", handleCellClick);
  });

  setBoardClass();
}

// add appropriate class to cell
// advance the game state
function handleCellClick(e) {
  if (!winner) {
    const currentTurnClass = xTurn ? X_CLASS : O_CLASS;
    e.target.classList.add(currentTurnClass);

    checkForDraw() ? endGame() : null;
    checkForWinner() ? endGame(true) : console.log("No winner.");

    // advance the turn after winner is checked
    xTurn ? (xTurn = false) : (xTurn = true);
    setBoardClass();
  }
}

// stop the game if there is a winner
function endGame(isWinner) {
  const currentTurnClass = xTurn ? X_CLASS : O_CLASS;

  // remove event listeners
  cells.forEach(cell => {
    cell.removeEventListener("click", handleCellClick);
  });

  // set winner msg
  let messageForWin = `${currentTurnClass.toUpperCase()} Won The Game!!!`;

  // set draw msg
  let messageForDraw = `It's a Draw!! Try again?`;

  if (isWinner) {
    winner = true;
    winnerMessage.innerHTML = messageForWin;
  } else {
    winnerMessage.innerHTML = messageForDraw;
  }

  openModal();
}

// check for a draw returns true if every cell has a class
function checkForDraw() {
  return [...cells].every(
    cell => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

// apply class to game board that will determine cell hover styles
function setBoardClass() {
  board.classList.remove(X_CLASS, O_CLASS);
  if (!winner) {
    xTurn ? board.classList.add(X_CLASS) : board.classList.add(O_CLASS);
  }
}

// returns true of false if there is a winner
function checkForWinner() {
  const currentTurnClass = xTurn ? X_CLASS : O_CLASS;
  let currentTurnArray;

  // loops through our win condition array and to checks each set against the current CELL array and returns true if each element in the win con matches  the current class to of the cell of the same index matches the currentTurnClass
  return WIN_CONDITIONS.some(condition => {
    return condition.every(index => {
      return cells[index].classList.contains(currentTurnClass);
    });
  });
}
// fire it up!
game();
