import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import BattleCapture from '../src/components/battle/Capture.vue'
import { shlageball } from '../src/data/items/shlageball'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBallStore } from '../src/stores/ball'
import { useInventoryStore } from '../src/stores/inventory'
import * as captureUtils from '../src/utils/capture'
import { createDexShlagemon } from '../src/utils/dexFactory'

describe('capture button animation', () => {
  it('animates only when at least one ball is available', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const ball = useBallStore()
    const inventory = useInventoryStore()
    ball.current = shlageball.id
    const enemy = createDexShlagemon(carapouffe)
    vi.spyOn(captureUtils, 'getCaptureChance').mockReturnValue(85)

    const i18n = createI18n({
      legacy: false,
      locale: 'en',
      messages: { en: { components: { battle: { Capture: { noBall: '', capture: '', cooldown: '', ko: '', playerKo: '', needBadge: '' } } } } },
    })

    const wrapper = mount(BattleCapture, {
      props: { enemy, enemyHp: enemy.hp, playerHp: enemy.hp, stopBattle: vi.fn() },
      global: {
        plugins: [pinia, i18n],
        stubs: {
          Tooltip: { template: '<div><slot /></div>' },
          ImageByBackground: { template: '<div v-bind="$attrs" />' },
        },
      },
    })

    const image = wrapper.get('[alt="capture"]')
    expect(image.classes()).not.toContain('animate-pulse-special')
    inventory.add(shlageball.id)
    await nextTick()
    expect(image.classes()).toContain('animate-pulse-special')
  })
})
