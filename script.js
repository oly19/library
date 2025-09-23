const Gameboard = (function () {
  const currentGameBoard = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null]
  ];

  const trackTurnArray = [];

  const getScore = () => {
    console.log("Current score board:")
    console.log(currentGameBoard.map(row => [...row]));
    return currentGameBoard
  };

  const trackTurnOrder = function (player) {
    trackTurnArray.push(player.name);
  }

  const validateTurnOrder = function (player) {
    const turnLen = trackTurnArray.length
    console.log(trackTurnArray)
    if (turnLen > 1 && trackTurnArray[turnLen - 1] === trackTurnArray[turnLen - 2]) {
    console.log(
      `Invalid input. On turn ${turnLen}, ${player.name} ` +
      `tried to play a second turn in a row!`
    );
      return true;
    }
  }

  const validateInRangeBoardInput = function(player, row, column) {
    if (row > 2 || column > 2) {
      console.log(
        `Invalid input. On turn ${trackTurnArray.length}, ${player.name} ` + 
        `tried to input the "${player.sign}" sign in cell ` +
        `(${row + 1},${column + 1}) which is out of range!`
      )
      return true
    }
  }
    
  const validateEmptyBoardInput = function (player, row, column) {
      if (currentGameBoard[row][column] !== null) {
        console.log(
          `Invalid input. On turn ${trackTurnArray.length}, ${player.name} ` + 
          `tried to input the "${player.sign}" sign in a non empty cell!`
        )
        return true
    }
  }

  const checkIfGameIsWon = function () {
    if (trackTurnArray.length < 5) {
      return
    }

    const winConfigurationArray = [
      [currentGameBoard[0][0], currentGameBoard[0][1], currentGameBoard[0][2]],   // First line 
      [currentGameBoard[1][0], currentGameBoard[1][1], currentGameBoard[1][2]],   // Second line
      [currentGameBoard[2][0], currentGameBoard[2][1], currentGameBoard[2][2]],   // Third line
      [currentGameBoard[0][0], currentGameBoard[1][0], currentGameBoard[2][0]],   // First column
      [currentGameBoard[0][1], currentGameBoard[1][1], currentGameBoard[2][1]],   // Second column
      [currentGameBoard[0][2], currentGameBoard[1][2], currentGameBoard[2][2]],   // Third column
      [currentGameBoard[0][0], currentGameBoard[1][1], currentGameBoard[2][2]],   // First diagonal
      [currentGameBoard[0][2], currentGameBoard[1][1], currentGameBoard[2][0]],   // Second diagonal
    ];

    const winArray = winConfigurationArray.filter(
      winConfig => winConfig.every(cell => cell === winConfig[0])
    );

    if (winArray) {
      console.log(`Game is over`)
    }
  }

  const playTurn = function (player, row, column) {
    trackTurnOrder(player);

    if (validateTurnOrder(player)) {
      return;
    }
    if (validateInRangeBoardInput(player, row, column)) {
      return;
    }
    if (validateEmptyBoardInput(player, row, column)) {
      return;
    }

    currentGameBoard[row][column] = player.sign
    console.log(
      `${player.name} placed "${player.sign}" symbol in row ${row + 1} and column ${column + 1}.`
    );
    getScore()
    checkIfGameIsWon()
  };

  return { getScore, playTurn };

})();



function createPlayer(name, sign) {
  return { name, sign };
}

const player1 = createPlayer("Omar", "X");
const player2 = createPlayer("Ali", "O");

Gameboard.getScore();
Gameboard.playTurn(player1, 1, 2);
Gameboard.playTurn(player2, 2, 1);
Gameboard.playTurn(player1, 1, 1);
Gameboard.playTurn(player2, 0, 1);
Gameboard.playTurn(player1, 1, 0);