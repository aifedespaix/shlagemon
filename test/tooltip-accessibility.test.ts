import { describe, expect, it } from 'vitest'
import { observeTooltipAccessibility } from '../src/utils/tooltipAccessibility'

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

describe('observeTooltipAccessibility', () => {
  it('removes poppers from tab order and toggles inert', async () => {
    const root = document.createElement('div')
    const observer = observeTooltipAccessibility(root)

    const popper = document.createElement('div')
    popper.className = 'v-popper__popper'
    popper.setAttribute('aria-hidden', 'true')
    root.appendChild(popper)

    await flush()
    expect(popper.getAttribute('tabindex')).toBe('-1')
    expect(popper.hasAttribute('inert')).toBe(true)

    popper.setAttribute('aria-hidden', 'false')
    await flush()
    expect(popper.hasAttribute('inert')).toBe(false)

    popper.setAttribute('tabindex', '0')
    await flush()
    expect(popper.getAttribute('tabindex')).toBe('-1')

    observer.disconnect()
  })
})
