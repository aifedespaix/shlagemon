import type { TypeName } from '../src/type'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TypeChart from '../src/components/shlagemon/TypeChart.vue'
import { shlagemonTypes } from '../src/data/shlagemons-type'

describe('type chart', () => {
  it('renders correct multipliers using type identifiers', () => {
    const wrapper = mount(TypeChart, {
      props: { highlight: null },
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

  it('highlights row and column on header click', async () => {
    const wrapper = mount(TypeChart, {
      props: { highlight: null },
      global: {
        stubs: {
          ShlagemonType: { template: '<div />' },
        },
      },
    })
    const ids = Object.keys(shlagemonTypes)

    // Highlight a row
    const poisonIndex = ids.indexOf('poison')
    await wrapper.findAll('tbody tr')[poisonIndex].find('th button').trigger('click')
    let highlight = wrapper.emitted('update:highlight')?.at(-1)?.[0] as TypeName
    await wrapper.setProps({ highlight })
    wrapper
      .findAll('tbody tr')[poisonIndex]
      .findAll('td')
      .forEach(cell => expect(cell.classes()).toContain('bg-blue-200'))

    // Highlight a column
    const feeIndex = ids.indexOf('fee')
    await wrapper.findAll('thead tr th')[feeIndex + 1].find('button').trigger('click')
    highlight = wrapper.emitted('update:highlight')?.at(-1)?.[0] as TypeName
    await wrapper.setProps({ highlight })
    wrapper.findAll('tbody tr').forEach((row) => {
      const cell = row.findAll('td')[feeIndex]
      expect(cell.classes()).toContain('bg-blue-200')
    })
  })
})
