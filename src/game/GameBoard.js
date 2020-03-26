import { BOARD_SIZE } from '../constants/constants'
import Ship from './Ship'
import { SHIP_INVENTORY } from '../constants/constants'
import { randomInt } from './Utils'

const initializeBoard = () => {
  // Create empty 10x10 board with arrays of empty strings
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill('-'))
}

export const validCoords = (coords) =>
// Use with .filter to return true only for row/col coordinate values that fall inside the gameboard
  // The double exclamation points is to convert truthy/falsy types to boolean (true/false)
  !!(
    coords.row >= 0 &&
    coords.col >= 0 &&
    coords.row < BOARD_SIZE &&
    coords.col < BOARD_SIZE
  )

const getNeighbors = (ship, includeShip) => {
// Create coordinate array around and including the ship
// Pass false for includeShip to exclude ship in coordinates array
  const { length, orientation } = ship
  const { row, col } = ship.startCoords()
  let neighborCoords = []

  if (orientation) {
    // If ship is horizontal
    neighborCoords = [
      // Coordinates in front of ship's bow
      { row: row - 1, col: col - 1 },
      { row, col: col - 1 },
      { row: row + 1, col: col - 1 },
      // Coordinates behind ship's stern
      { row: row - 1, col: col + length },
      { row, col: col + length },
      { row: row + 1, col: col + length },
    ]
    // Coordinates to port and starboard side of ship
    for (let j = col; j < col + length; j++) {
      neighborCoords.push({ row: row - 1, col: j })
      if (includeShip) neighborCoords.push({ row, col: j })
      neighborCoords.push({ row: row + 1, col: j })
    }
  } else {
    // Else ship is vertical
    neighborCoords = [
      // Coordinates in front of ship's bow
      { row: row - 1, col: col - 1 },
      { row: row - 1, col },
      { row: row - 1, col: col + 1 },
      // Coordinates behind ship's stern
      { row: row + length, col: col - 1 },
      { row: row + length, col },
      { row: row + length, col: col + 1 },
    ]
    // Coordinates to port and starboard side of ship
    for (let i = row; i < row + length; i++) {
      neighborCoords.push({ row: i, col: col - 1 })
      if (includeShip) neighborCoords.push({ row: i, col })
      neighborCoords.push({ row: i, col: col + 1 })
    }
  }
  // Remove coordinates that fall off of the gameboard
  return neighborCoords.filter(validCoords)
}

export default function GameBoard () {
  let board = initializeBoard()
  let ships = []

  const getGameBoard = () => board
  const getAttackBoard = () => board.map(
    x => x.map(cell => cell === 'S' ? '-' : cell))
  const getShips = () => ships

  const markArea = ship => {
    const coords = getNeighbors(ship, false)
    coords.forEach(coord => {
      board[coord.row][coord.col] = 'M'
    })
  }

  const canPlaceShip = ship => {
    // Check if ship can be placed on chosen area on the gameboard
    const { length, orientation } = ship
    const { row, col } = ship.startCoords()
    // Can not place ship if bow is outside of gameboard
    if (row < 0 || col < 0
      || row >= BOARD_SIZE || col >= BOARD_SIZE) return false
    // Can not place ship if stern falls outside of gameboard
    if (orientation) if (col + length > BOARD_SIZE) return false
    if (!orientation) if (row + length > BOARD_SIZE) return false
    // Can not place ship next to another ship
    let spaceAvailable = true
    const neighbors = getNeighbors(ship, true)
    for (const coords of neighbors) {
      if (board[coords.row][coords.col] === 'S') {
        spaceAvailable = false
        break
      }
    }
    return spaceAvailable
  }

  const canMoveShip = (ship, row, col) => {
    // Check if ship can be moved to new location
    const shipCoords = ship.coords
    // Remove ship from old gameboard position
    shipCoords.forEach(coord => {board[coord.row][coord.col] = '-'})
    // Remove ship from ships array
    ships = ships.filter(
      currentShip => !currentShip.coords.find(
        coord =>
          ship.coords[0].row === coord.row &&
          ship.coords[0].col === coord.col,
      ),
    )
    // Create new ship in new location
    const newShip = Ship(row, col, ship.length, ship.orientation)
    // Check if ship can be moved to new area on gameboard
    if (canPlaceShip(newShip)) return true

    // Restore ship in old location & return false if can not place new ship
    shipCoords.forEach(coord => {
      board[coord.row][coord.col] = 'S'
    })
    ships.push(ship)
    return false
  }

  const placeAShip = (ship) => {
    // Put ship on gameboard
    if (canPlaceShip(ship)) {
      ship.coords.forEach(coord => {
        board[coord.row][coord.col] = 'S'
      })
      ships.push(ship)
      // Return true if ship placement was successful
      return true
    }
    // Return false if ship was NOT placed
    return false
  }

  const placeShips = () => {
    // Place ships in random locations and orientations
    // Number and length of ships to place
    const shipsToPlace = SHIP_INVENTORY
    // Loop through array of ships until all are placed
    shipsToPlace.forEach(({ quantity, length }) => {
      while (quantity > 0) {
        const newShip = Ship(
          randomInt(0, BOARD_SIZE),
          randomInt(0, BOARD_SIZE),
          length,
          Math.random() > 0.5)
        if (placeAShip(newShip)) quantity--
      }
    })
  }

  const moveShip = (ship, row, col) => {
    // Move ship to new location
    if (canMoveShip(ship, row, col)) {
      const movedShip = Ship(row, col, ship.length, ship.orientation)
      placeAShip(movedShip)
      return movedShip
    }
    return undefined
  }

  const randomizeShips = () => {
    // Reshuffle location of all ships
    board = initializeBoard()
    ships = []
    placeShips()
  }

  const receiveAttack = (row, col) => {
    // Deal damage to ship
    // If attack hits the ocean/gameboard, mark it as a miss
    if (board[row][col] !== 'S') {
      board[row][col] = 'M'
      return 'miss'
    }

    // Find the ship that was hit
    const ship = ships.find(currentShip =>
      currentShip.coords.find(
        coord => coord.row === row && coord.col === col),
    )

    // Deal hit to ship and check if ship is sunk
    if (ship) {
      ship.hit()
      if (ship.isSunk()) {
        board[row][col] = 'X'
        markArea(ship)
        return 'sunk'
      }
      board[row][col] = 'X'
      return 'hit'
    }
  }

  return {
    canMoveShip,
    getAttackBoard,
    getGameBoard,
    getShips,
    moveShip,
    placeAShip,
    placeShips,
    randomizeShips,
    receiveAttack,
  }
}
