import { RollTables } from './tables'
import * as SalvageUnionTypes from './types'
import { D20 } from 'randsum'

function interpretResult(result: number): SalvageUnionTypes.CoreMechanic {
  switch (true) {
    case result === 20:
      return SalvageUnionTypes.CoreMechanic.nailedIt
    case result >= 11 && result <= 19:
      return SalvageUnionTypes.CoreMechanic.success
    case result >= 6 && result <= 10:
      return SalvageUnionTypes.CoreMechanic.toughChoice
    case result >= 2 && result <= 5:
      return SalvageUnionTypes.CoreMechanic.failure
    default:
      return SalvageUnionTypes.CoreMechanic.cascadeFailure
  }
}

function roll(
  tableKey: SalvageUnionTypes.Table = SalvageUnionTypes.Table.coreMechanic
): [SalvageUnionTypes.TableResult, number] {
  const total = D20.roll()
  return [RollTables[tableKey][interpretResult(total)], total]
}

import * as tables from './tables'

export const SalvageUnion = { interpretResult, roll, tables }
