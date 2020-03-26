import Opponent from '../Opponent'
import Player from '../Player'

describe('Opponent', () => {
  let player
  let opponent = Opponent()

  beforeEach(() => {
    player = Player()
    opponent = Opponent()
  })

  test('return false if attackResult==="miss"', () => {
    expect(opponent.attack(player)).toBeFalsy()
  })
})