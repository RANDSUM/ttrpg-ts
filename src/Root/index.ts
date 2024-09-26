import { roll as baseRoll, DicePoolType, RandsumRollResult } from 'randsum'
import * as RootTypes from './types'

function interpretResult(result: number): RootTypes.Hit {
  switch (true) {
    case result >= 10:
      return RootTypes.Hit.strongHit
    case result >= 7 && result <= 9:
      return RootTypes.Hit.weakHit
    default:
      return RootTypes.Hit.miss
  }
}

function roll(
  bonus: number
): [RootTypes.Hit, RandsumRollResult<number, DicePoolType.numerical>] {
  const result = baseRoll({
    quantity: 2,
    sides: 6,
    modifiers: { plus: bonus }
  })

  return [interpretResult(result.total), result]
}

export const Root = { roll, interpretResult }
