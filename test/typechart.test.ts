import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TypeChart from '../src/components/shlagemon/TypeChart.vue'
import { shlagemonTypes } from '../src/data/shlagemons-type'

describe('type chart', () => {
  it('renders correct multipliers using type identifiers', () => {
    const wrapper = mount(TypeChart, {
      global: {
        stubs: {
          ShlagemonType: { template: '<div />' },
        },
      },
    })
    const ids = Object.keys(shlagemonTypes)
    const poisonRow = wrapper.findAll('tbody tr')[ids.indexOf('poison')]
    const feeColIndex = ids.indexOf('fee')
    const poisonCells = poisonRow.findAll('td')
    expect(poisonCells[feeColIndex].text()).toBe('1.5')

    const electricRow = wrapper.findAll('tbody tr')[ids.indexOf('electrique')]
    const solColIndex = ids.indexOf('sol')
    const electricCells = electricRow.findAll('td')
    expect(electricCells[solColIndex].text()).toBe('0.5')
  })
})
