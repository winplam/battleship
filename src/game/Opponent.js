import Player from './Player'
import { BOARD_SIZE } from '../constants/constants'
import { randomInt } from './Utils'
import { validCoords } from './GameBoard'

export default function Opponent () {
  let hitHistory = []
  const player = Player()

  // Computer randomly chooses an "empty" part of the gameboard to attack
  const randomAttack = board => {
    const emptyCells = []

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === '-') {
          emptyCells.push({ row, col })
        }
      }
    }
    return emptyCells[randomInt(0, emptyCells.length)]
  }

  const searchingAttack = board => {
    const { row, col } = hitHistory[hitHistory.length - 1]
    let neighbors = []
    if (hitHistory.length > 1) {
      const prevHit = hitHistory[hitHistory.length - 2]

      if (prevHit.row === row) {
        const sortedHitHistory = hitHistory.sort((a, b) => a.col - b.col)
        const minCoords = sortedHitHistory[0]
        const maxCoords = sortedHitHistory[sortedHitHistory.length - 1]
        neighbors.push({ row, col: maxCoords.col + 1 })
        neighbors.push({ row, col: minCoords.col - 1 })
      }

      if (prevHit.col === col) {
        const sortedHitHistory = hitHistory.sort((a, b) => a.row - b.row)
        const minCoords = sortedHitHistory[0]
        const maxCoords = sortedHitHistory[sortedHitHistory.length - 1]
        neighbors.push({ row: maxCoords.row + 1, col })
        neighbors.push({ row: minCoords.row - 1, col })
      }
    } else {
      neighbors.push({ row: row - 1, col })
      neighbors.push({ row, col: col + 1 })
      neighbors.push({ row: row + 1, col })
      neighbors.push({ row, col: col - 1 })
    }
    neighbors = neighbors.filter(validCoords)
    const emptyNeighbors = []
    neighbors.forEach(coords => {
      if (board[coords.row][coords.col] === '-') {
        emptyNeighbors.push(coords)
      }
    })
    return emptyNeighbors[randomInt(0, emptyNeighbors.length)]
  }

  const getAttackCoords = enemy => {
    let coords
    const enemyBoard = enemy.getAttackBoard()
    if (hitHistory.length === 0) {
      coords = randomAttack(enemyBoard)
    } else {
      coords = searchingAttack(enemyBoard)
    }
    return coords
  }

  const attack = enemy => {
    const { row, col } = getAttackCoords(enemy)
    const attackResults = enemy.receiveAttack(row, col)
    if (attackResults === 'hit') {
      hitHistory.push({ row, col })
      return true
    }
    if (attackResults === 'sunk') {
      hitHistory = []
      return true
    }
    return false
  }

  return Object.assign(player, {
    attack,
  })
}
