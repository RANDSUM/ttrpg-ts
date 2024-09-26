import { roll as baseRoll, DicePoolType, RandsumRollResult } from 'randsum'
import * as RootTypes from './types'

function interpretResult(result: number): RootTypes.RollResult {
  switch (true) {
    case result >= 10:
      return RootTypes.RollResult.strongHit
    case result >= 7 && result <= 9:
      return RootTypes.RollResult.weakHit
    default:
      return RootTypes.RollResult.miss
  }
}

function roll(
  bonus: number
): [RootTypes.RollResult, RandsumRollResult<number, DicePoolType.numerical>] {
  const result = baseRoll({
    quantity: 2,
    sides: 6,
    modifiers: { plus: bonus }
  })

  return [interpretResult(result.total), result]
}

export default { roll, interpretResult, types: RootTypes }
