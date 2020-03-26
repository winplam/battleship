import Player from '../Player'
import Ship from '../Ship'

describe('Player', () => {
  let player
  beforeEach(() => {
    player = Player()
  })
  test('return false if player has alive ship', () => {
    const ship = Ship(3, 3, 2)
    player.placeAShip(ship)
    ship.hit()
    expect(player.haveLost()).toBeFalsy()
  })
  test('return true if player lost all ships', () => {
    const ship = Ship(3, 3, 1)
    player.placeAShip(ship)
    ship.hit()
    expect(player.haveLost()).toBeTruthy()
  })
  test('return false if attackResults==="miss"', () => {
    const computer = Player()
    expect(player.attack(computer, 0, 0)).toBeFalsy()
  })
  test('return true if attackResult==="hit"', () => {
    const computer = Player()
    const ship = Ship(1, 2, 3, false)
    computer.placeAShip(ship)
    expect(player.attack(computer, 1, 2)).toBeTruthy()
    expect(player.attack(computer, 3, 2)).toBeTruthy()
  })
})