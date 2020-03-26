import GameBoard from '../GameBoard'
import Ship from '../Ship'

describe('GameBoard', () => {
  let gameBoard
  beforeEach(() => {
    gameBoard = GameBoard()
  })
  test.each([
    [Ship(0, 0, 1, true), true, 1],
    [Ship(6, 6, 4, false), true, 1],
    [Ship(0, 7, 4, true), false, 0],
    [Ship(7, 0, 4, false), false, 0],
  ])(
    // Valid coordinates fall within boundary of the gameBoard
    'placeAShip() returns true/false if ship is inside/outside of gameBoard',
    (ship, expected, length) => {
      expect(gameBoard.placeAShip(ship)).toBe(expected)
      expect(gameBoard.getShips()).toHaveLength(length)
    })
  test(`placeAShip() returns false if found another ship nearby`, () => {
    gameBoard.placeAShip(Ship(2, 2, 2))
    expect(gameBoard.placeAShip(Ship(0, 4, 2, false))).toBeFalsy()
    expect(gameBoard.placeAShip(Ship(2, 2, 1))).toBeFalsy()
    expect(gameBoard.placeAShip(Ship(3, 4, 1))).toBeFalsy()
  })
  test('moveShip returns movedShip if ship moved', () => {
    const ship1 = Ship(2, 2, 3, true)
    const ship2 = Ship(8, 8, 2, false)
    gameBoard.placeAShip(ship1)
    gameBoard.placeAShip(ship2)
    const ship1After1stMove = gameBoard.moveShip(ship1, 0, 0)
    const ship1After2ndMove = gameBoard.moveShip(ship1After1stMove, 1, 1)
    const ship2After1stMove = gameBoard.moveShip(ship2, 8, 9)
    expect(ship1After1stMove.coords)
      .toEqual([{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }])
    expect(ship1After2ndMove.coords)
      .toEqual([{ row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }])
    expect(ship2After1stMove.coords)
      .toEqual([{ row: 8, col: 9 }, { row: 9, col: 9 }])
    expect(gameBoard.getShips()).toHaveLength(2)
  })
  test('moveShip return undefined if attempt to move to invalid coords', () => {
    const ship1 = Ship(0, 0, 4, false)
    const ship2 = Ship(3, 3, 4)
    gameBoard.placeAShip(ship1)
    gameBoard.placeAShip(ship2)
    // Attempt to move entire ship off right side of gameBoard
    expect(gameBoard.moveShip(ship1, 5, 10)).toBeUndefined()
    // Attempt to move stern off bottom of gameBoard
    expect(gameBoard.moveShip(ship1, 7, 0)).toBeUndefined()
    // Attempt to move entire ship off bottom of gameBoard
    expect(gameBoard.moveShip(ship1, 10, 0)).toBeUndefined()
    // Attempt to move ship to negative row/col
    expect(gameBoard.moveShip(ship1, -1, 0)).toBeUndefined()
    expect(gameBoard.moveShip(ship1, 0, -1)).toBeUndefined()
    // Attempt to move stern of ship2 off right edge
    expect(gameBoard.moveShip(ship2, 3, 7)).toBeUndefined()
  })
  test('moveShip return undefined if attempt to move next to another ship',
    () => {
      const ship1 = Ship(2, 2, 2)
      const ship2 = Ship(4, 4, 4)
      gameBoard.placeAShip(ship1)
      gameBoard.placeAShip(ship2)
      // Attempt to move ship1 on top of ship2
      expect(gameBoard.moveShip(ship1, 4, 4)).toBeUndefined()
      // Attempt to move ship2 on top of ship1
      expect(gameBoard.moveShip(ship2, 2, 2)).toBeUndefined()
    })
  test('initialize gameBoard with 10 ships', () => {
    gameBoard.placeShips()
    expect(gameBoard.getGameBoard()).toHaveLength(10)
    expect(gameBoard.getGameBoard()[0]).toHaveLength(10)
    expect(gameBoard.getShips()).toHaveLength(10)
  })
  test('receiveAttack return miss', () => {
    expect(gameBoard.receiveAttack(3, 3)).toBe('miss')
  })
  test('receiveAttack return hit', () => {
    const ship = Ship(3, 3, 3)
    gameBoard.placeAShip(ship)
    expect(gameBoard.receiveAttack(3, 3)).toBe('hit')
    expect(gameBoard.getShips()[0].isSunk()).toBeFalsy()
  })
  test('receiveAttack return sunk', () => {
    const ship = Ship(4, 4, 1)
    gameBoard.placeAShip(ship)
    expect(gameBoard.receiveAttack(4, 4)).toBe('sunk')
    expect(gameBoard.getShips()[0].isSunk()).toBeTruthy()
  })
})
