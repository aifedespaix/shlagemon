import type { BaseShlagemon } from '~/type'

export function pickRandomByCoefficient(list: BaseShlagemon[]): BaseShlagemon {
  const total = list.reduce((sum, mon) => sum + 1 / mon.coefficient, 0)
  const r = Math.random() * total
  let acc = 0
  for (const mon of list) {
    acc += 1 / mon.coefficient
    if (r < acc)
      return mon
  }
  return list[list.length - 1]
}
