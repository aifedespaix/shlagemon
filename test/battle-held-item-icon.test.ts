import type { Item } from '../src/type/item'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import HeldItemIcon from '../src/components/battle/mon/HeldItemIcon.vue'

describe('battle held item icon', () => {
  const messages = { en: { item: { test: 'Test Item' } } }
  const i18n = createI18n({ legacy: false, locale: 'en', messages })

  it('renders image with alt text', () => {
    const item: Item = {
      id: 'test',
      name: 'item.test',
      description: 'desc',
      image: '/test.png',
    }

    const wrapper = mount(HeldItemIcon, {
      props: { item },
      global: { plugins: [i18n], directives: { tooltip: () => {} } },
    })

    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('/test.png')
    expect(img.attributes('alt')).toBe('Test Item')
  })

  it('renders icon with aria-label', () => {
    const item: Item = {
      id: 'test',
      name: 'item.test',
      description: 'desc',
      icon: 'i-test-icon',
      iconClass: 'text-red',
    }

    const wrapper = mount(HeldItemIcon, {
      props: { item },
      global: { plugins: [i18n], directives: { tooltip: () => {} } },
    })

    const div = wrapper.get('div')
    expect(div.classes()).toContain('i-test-icon')
    expect(div.attributes('aria-label')).toBe('Test Item')
  })
})
