import GameBoard from './GameBoard'

// Object for keeping track a players gameboard, lost status, and attacks
export default function Player () {
  const gameBoard = GameBoard()

  // Determine if every ship has sunk
  const haveLost = () => {
    return gameBoard.getShips().every(ship => ship.isSunk())
  }

  // Attack the opponent at specified coordinates
  const attack = (opponent, row, col) => {
    const attackResult = opponent.receiveAttack(row, col)
    return attackResult !== 'miss'
  }

  // destructure properties form gameBoard
  const {
    canMoveShip,
    getAttackBoard,
    getGameBoard,
    getShips,
    moveShip,
    placeAShip,
    placeShips,
    randomizeShips,
    receiveAttack,
  } = gameBoard

  return {
    attack,
    canMoveShip,
    getAttackBoard,
    getGameBoard,
    getShips,
    haveLost,
    moveShip,
    placeAShip,
    placeShips,
    randomizeShips,
    receiveAttack
  }
}
