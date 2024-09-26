import { roll as baseRoll, DicePoolType, RandsumRollResult } from 'randsum'
import * as DnD5ETypes from './types'

function roll(
  bonus: number = 0,
  mod: DnD5ETypes.RollMods
): [number, RandsumRollResult<number, DicePoolType.numerical>] {
  const isAdvantage = DnD5ETypes.RollMods.Advantage === mod
  const isDisadvantage = DnD5ETypes.RollMods.Disadvantage === mod
  const rollResult = baseRoll({
    sides: 20,
    quantity: isAdvantage || isDisadvantage ? 2 : 1,
    modifiers: {
      plus: bonus,
      ...(isAdvantage ? { drop: { lowest: 1 } } : {}),
      ...(isDisadvantage ? { drop: { highest: 1 } } : {})
    }
  })

  return [rollResult.total, rollResult]
}

export const DnD5E = { roll }
