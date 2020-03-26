import Ship from '../Ship'

describe('ships', () => {
  test('create horizontal ship', () => {
    const ship = Ship(0, 0, 1)
    expect(ship.coords).toEqual([{ 'row': 0, 'col': 0 }])
    expect(ship.startCoords()).toEqual({ 'row': 0, 'col': 0 })
    expect(ship.isSunk()).toBeFalsy()
    expect(ship.length).toEqual(1)
  })

  test('create vertical ship', () => {
    const ship = Ship(6, 9, 4, false)
    expect(ship.coords).toEqual([
      { 'row': 6, 'col': 9 },
      { 'row': 7, 'col': 9 },
      { 'row': 8, 'col': 9 },
      { 'row': 9, 'col': 9 }])
    expect(ship.startCoords()).toEqual({ 'row': 6, 'col': 9 })
    expect(ship.isSunk()).toBeFalsy()
    expect(ship.length).toEqual(4)
  })

  test('ship is sunk', () => {
    const ship = Ship(4, 4, 2)
    for (let i = 0; i < ship.length; i++) ship.hit()
    expect(ship.isSunk()).toBeTruthy()
  })

})