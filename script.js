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
      console.log(`Invalid input. ${player.name} tried to play two turns in a row!`)
      return true;
    }
  }

  const validateInRangeBoardInput = function(row, column) {
    if (row > 2 || column > 2) {
      console.log(`Invalid input. The cell (${row + 1},${column + 1}) is out of range!`)
      return true
    }
  }
    
  const validateEmptyBoardInput = function (row, column) {
      if (currentGameBoard[row][column] !== null) {
        console.log(`Invalid input. The cell (${row},${column}) already contains a sign!`)
        return true
    }
  }

  const playTurn = function (player, row, column) {
    trackTurnOrder(player);

    if (validateTurnOrder(player)) {
      return;
    }
    if (validateInRangeBoardInput(row, column)) {
      return;
    }
    if (validateEmptyBoardInput(row, column)) {
      return;
    }

    currentGameBoard[row][column] = player.sign
    console.log(
      `${player.name} placed "${player.sign}" symbol in row ${row + 1} and column ${column + 1}.`
    );
    return getScore()
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

