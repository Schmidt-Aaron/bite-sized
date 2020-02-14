const game = () => {
  console.log("game running");
  // globals
  const cells = document.querySelectorAll(".cell");
  const gameBoard = document.querySelector(".game-board");
  const resetButton = document.querySelector(".reset-button");
  const modal = document.querySelector(".modal");
  const modalTextbox = document.querySelector(".modal-textbox");
  const startButton = document.querySelector(".start-button");
  const optionsButton = document.querySelector(".options-button");
  const message = document.querySelector(".message");

  // player designations
  const PLAYER_ONE = "yellow";
  const PLAYER_TWO = "red";

  // toggle for keeping track of game state
  let playerOneTurn = true;
  let winner = false;
  let playerTwo = true;

  // future game array
  let gameArray = [];

  const toggleModal = () => {
    modalTextbox.classList.toggle("close");
    modal.classList.toggle("hide");
  };

  const updateMessage = txt => {
    message.textContent = txt;
  };

  optionsButton.addEventListener("click", () => {
    toggleModal();
  });

  startButton.addEventListener("click", () => {
    toggleModal();
    updateMessage("Player One's Turn");
  });

  // click handler if no winner
  cells.forEach(cell => {
    cell.addEventListener("click", e => {
      const placement = e.target.dataset.cell.split("-");
      const column = placement[1];
      if (!winner) {
        findSpotInColumn(column);
      }
    });
  });

  // hover handler to get column => use to generate outline before click
  gameBoard.addEventListener("mouseover", e => {
    const place = e.target.dataset.cell.split("-");
    const column = place[1];
    const targetCell = `0-${column}`;
    const color = playerOneTurn ? PLAYER_ONE : PLAYER_TWO;

    if (!winner) {
      cells.forEach(item => {
        if (
          item.dataset.cell === targetCell &&
          !item.classList.contains("filled")
        ) {
          item.classList.add("hover", color);
        }
      });
    }
  });

  // remove hover on mouseout
  gameBoard.addEventListener("mouseout", e => {
    const place = e.target.dataset.cell.split("-");
    const column = place[1];
    const targetCell = `0-${column}`;

    cells.forEach(item => {
      if (
        item.dataset.cell === targetCell &&
        !item.classList.contains("filled")
      ) {
        item.classList.remove("hover", PLAYER_ONE, PLAYER_TWO);
      }
    });
  });

  // temp button listeners

  resetButton.addEventListener("click", () => {
    console.log("reset");
    resetGame();
  });

  // applies player class to DOM cell
  const addPlayerClass = (row, column) => {
    console.log("addplayerclass", row, column);
    let color = playerOneTurn ? PLAYER_ONE : PLAYER_TWO;

    const placeString = `${row}-${column}`;
    const hoverString = `0-${column}`;
    cells.forEach(cell => {
      if (cell.dataset.cell === placeString) {
        cell.classList.add(color, "filled");
      }
    });

    // remove hover class
    cells.forEach(item => {
      if (
        item.dataset.cell === hoverString &&
        !item.classList.contains("filled")
      ) {
        item.classList.remove(PLAYER_ONE, PLAYER_TWO);
      }
    });
  };

  // advances turn toggle
  const advanceTurn = () => {
    playerOneTurn = playerOneTurn ? false : true;
    updateMessage(playerOneTurn ? "Player One's Turn" : "Player Two's Turn");
  };

  const updateGameState = (row, column) => {
    console.log(`updating game state for row: ${row} column: ${column}`);
    const currentPlayerString = playerOneTurn ? PLAYER_ONE : PLAYER_TWO;
    gameArray[row][column] = currentPlayerString;
    addPlayerClass(row, column);
    checkForWinner(row, column, currentPlayerString);
  };

  // find the highest empty row in column
  const findSpotInColumn = column => {
    console.log(`finding spot in column: ${column}`);
    let updated = false;
    gameArray.forEach((row, i) => {
      // exit if top row for specified column is full
      // todo move this check to parent function??
      if (i === 0 && row[column] !== 0) {
        updated = true;
        return false;
      }
      // what to do if the cell is filled
      if (row[column] !== 0 && !updated) {
        updateGameState(i - 1, column);
        updated = true;
      } else if (i === 5 && !updated) {
        updateGameState(5, column);
      }
    });
  };

  // pass in latest move [row, column]
  // check neighbors
  const checkForWinner = (row, column, player) => {
    if (
      checkVerticalWin(row, column, player) ||
      checkHorizontalWin(row, player) ||
      checkDownwardDiagonalWin(+row, +column, player) ||
      checkUpwardDiagonalWin(+row, +column, player)
    ) {
      console.log("winner! winner!");
      winner = true;
      let winningPlayer = playerOneTurn ? "One" : "Two";
      updateMessage(`Player ${winningPlayer} is the winner!`);
    }

    if (!winner) {
      advanceTurn();
    }
    // if maxAdjacent < 4 - no winner
  };

  // check for a vertical win
  const checkVerticalWin = (row, column, player) => {
    let length = 0;
    let winner = false;
    // minor optimization: only check rows 0 - 2
    if (row < 3) {
      gameArray.forEach(row => {
        if (row[column] === player) {
          length += 1;

          // break condition
          if (length === 4) {
            console.log(`4 in a vert row! ${player} wins!!`);
            winner = true;
            return true;
          }
        } else {
          length = 0;
        }
      });
    }
    return winner;
  };

  // check for a horizontal win on single row; only check current row
  const checkHorizontalWin = (row, player) => {
    // console.log(`horizontal check: row ${row}, player: ${player}`);
    let length = 0;
    let winner = false;
    gameArray.forEach((rowToCheck, i) => {
      // only check current row
      if (i === row) {
        // console.log(`checking row ${i}`);
        rowToCheck.forEach(cell => {
          if (cell === player) {
            length += 1;

            // break condition
            if (length === 4) {
              console.log(`4 in a horiz row! ${player} wins!!`);
              winner = true;
              return true;
            }
          } else {
            length = 0;
          }
        });
      }
    });
    return winner;
  };

  const checkDownwardDiagonalWin = (row, column, player) => {
    // left value will be row -1, column -1
    // right value will be row +1, column +1
    let length = 0;
    let winner = false;
    let leftStop = false;
    let rightStop = false;

    let leftIterator = 1;
    let rightIterator = 1;

    while (!leftStop) {
      let rowToCheck = row - leftIterator;
      let columnToCheck = column - leftIterator;

      // escape if on top row, or leftmost column
      if (rowToCheck < 0 || columnToCheck < 0) {
        leftStop = true;
      } else {
        // move left and up on grid

        if (gameArray[rowToCheck][columnToCheck] === player) {
          length += 1;
          leftIterator += 1;
        } else {
          leftStop = true;
        }
      }
    }

    while (!rightStop) {
      let rowToCheck = row + rightIterator;
      let columnToCheck = column + rightIterator;

      // escape if on bottom row, or rightmost column
      if (rowToCheck > 5 || columnToCheck > 6) {
        rightStop = true;
      } else {
        // move right and down on grid
        if (gameArray[rowToCheck][columnToCheck] === player) {
          length += 1;
          rightIterator += 1;
        } else {
          rightStop = true;
        }
      }
    }

    if (length === 3) {
      console.log(`downward diagonal win! player ${player} wins`);
      winner = true;
    }

    return winner;
  };

  const checkUpwardDiagonalWin = (row, column, player) => {
    // left value will be row +1, column -1
    // right value will be row -1, column +1
    let length = 0;
    let winner = false;
    let leftStop = false;
    let rightStop = false;

    let leftIterator = 1;
    let rightIterator = 1;

    while (!leftStop) {
      let rowToCheck = row + leftIterator;
      let columnToCheck = column - leftIterator;

      // escape if on bottom row, or leftmost column
      if (rowToCheck > 5 || columnToCheck < 0) {
        leftStop = true;
      } else {
        if (gameArray[rowToCheck][columnToCheck] === player) {
          length += 1;
          leftIterator += 1;
        } else {
          leftStop = true;
        }
      }
    }

    while (!rightStop) {
      let rowToCheck = row - rightIterator;
      let columnToCheck = column + rightIterator;

      // escape if on top row, or rightmost column
      if (rowToCheck < 0 || columnToCheck > 6) {
        rightStop = true;
      } else {
        if (gameArray[rowToCheck][columnToCheck] === player) {
          length += 1;
          rightIterator += 1;
        } else {
          rightStop = true;
        }
      }
    }

    if (length === 3) {
      console.log(`upward diagonal win! player ${player} wins`);
      winner = true;
    }

    return winner;
  };

  // fill gameArray
  const makeEmptyBoard = () => {
    gameArray = Array.from({ length: 6 }).map(row =>
      Array.from({ length: 7 }).map(cell => 0)
    );
  };

  // resets game to initial state
  const resetGame = () => {
    console.log("Reset!");
    winner = false;
    playerOneTurn = true;
    cells.forEach(cell => {
      cell.classList.remove(PLAYER_ONE, PLAYER_TWO);
    });
    updateMessage("Player One's Turn");
    makeEmptyBoard();
  };

  makeEmptyBoard();
};

// run it
game();
