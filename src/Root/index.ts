import { roll as baseRoll } from 'randsum'
import { Root } from './types'

function interpretResult(result: number): Root.RollResult {
  switch (true) {
    case result >= 10:
      return Root.RollResult.success
    case result >= 7 && result <= 9:
      return Root.RollResult.partialSuccess
    default:
      return Root.RollResult.failure
  }
}

function roll(bonus: number): [Root.RollResult, number] {
  const { total } = baseRoll({
    quantity: 2,
    sides: 6,
    modifiers: { plus: bonus }
  })
  return [interpretResult(total), total]
}

export default { interpretResult, roll }
