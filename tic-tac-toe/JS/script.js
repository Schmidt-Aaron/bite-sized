// TODO add option to play AI and add difficulty settings
// difficulty easy = opp goes in random cell
// difficulty medium = ai goes in best square 50%
// difficulty hard = ai goes in best square 75%
// difficulty impossible = ai goes in best square 100%
// TODO add optimal ai move algorithm

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

// track turns // game state
let xTurn;
let winner;

// grab relevant elements
const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const modal = document.querySelector(".winner-message");
const closeModalElement = document.querySelector(".close-modal");
const resetButton = document.querySelector(".reset");
const winnerMessage = document.querySelector(".message");

// add event listeners
closeModalElement.addEventListener("click", closeModal);
resetButton.addEventListener("click", game);

function closeModal() {
  modal.classList.remove("show");
}

function openModal() {
  modal.classList.add("show");
}

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

  // winner msg
  let messageForWin = `${currentTurnClass.toUpperCase()}'s Win The Game!!!`;

  // draw msg
  let messageForDraw = `It's a Draw!!`;

  // apply modal message
  if (isWinner) {
    winner = true;
    winnerMessage.innerHTML = messageForWin;
  } else {
    winnerMessage.innerHTML = messageForDraw;
  }

  // show the modal
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

  // loops through our win condition array and to checks each set against the current CELL array and returns true if each element in the win con matches  the current class to of the cell of the same index matches the currentTurnClass
  return WIN_CONDITIONS.some(condition => {
    return condition.every(index => {
      return cells[index].classList.contains(currentTurnClass);
    });
  });
}
// fire it up!
game();
