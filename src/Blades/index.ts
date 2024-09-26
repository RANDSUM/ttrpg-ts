import { roll as baseRoll } from 'randsum'
import * as BladesTypes from './types'

function interpretHit(sortedRolls: number[]): BladesTypes.Hit {
  const sixes = sortedRolls.filter((r) => r === 6).length
  if (sixes >= 2) {
    return BladesTypes.Hit.CRITICAL
  }

  switch (sortedRolls[0]) {
    case 6:
      return BladesTypes.Hit.SUCCESS
    case 5:
    case 4:
      return BladesTypes.Hit.PARTIAL
    default:
      return BladesTypes.Hit.FAILURE
  }
}

function roll(count: number): [BladesTypes.Hit, number[]] {
  const rollResult = baseRoll({
    sides: 6,
    quantity: count
  })
  const rolls = rollResult.rawResult.flat().sort((a, b) => a - b)

  return [interpretHit(rolls), rolls]
}

export const Blades = { roll, interpretHit }
