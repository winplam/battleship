import { randomInt } from '../Utils'
import { BOARD_SIZE } from '../../constants/constants'

describe('random integer generator', () => {
  // check random number generator to verify that values fall within expectations
  test('check min/max values', () => {
    let randomValues = []
    for (let i = 0; i < 10000; i++) {
      randomValues.push(randomInt(0, BOARD_SIZE))
    }
    expect(Math.min(...randomValues)).toEqual(0)
    expect(Math.max(...randomValues)).toEqual(9)
  })
})