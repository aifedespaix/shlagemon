import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import Round from '../src/components/battle/Round.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { salamiches } from '../src/data/shlagemons/salamiches'
import { useShlagedexStore } from '../src/stores/shlagedex'

const playerFainted = ref(false)
const enemyFainted = ref(false)
const playerHp = ref(0)
const enemyHp = ref(1)
const startBattle = vi.fn()
const stopBattle = vi.fn()

vi.mock('../src/composables/useBattleCore', () => ({
  useBattleCore: () => ({
    playerHp,
    enemyHp,
    flashPlayer: ref(false),
    flashEnemy: ref(false),
    playerFainted,
    enemyFainted,
    showAttackCursor: ref(false),
    cursorX: ref(0),
    cursorY: ref(0),
    cursorClicked: ref(false),
    playerEffect: ref(null),
    enemyEffect: ref(null),
    playerVariant: ref(''),
    enemyVariant: ref(''),
    startBattle,
    stopBattle,
    attack: vi.fn(),
  }),
}))

describe('round battle switching', () => {
  beforeEach(() => {
    startBattle.mockClear()
    stopBattle.mockClear()
    playerFainted.value = false
    enemyFainted.value = false
  })

  it('stops previous battle before starting new when enemy changes rapidly', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy1 = dex.createShlagemon(salamiches)
    const enemy2 = dex.createShlagemon(carapouffe)
    const enemy3 = dex.createShlagemon(salamiches)
    const wrapper = mount(Round, {
      props: { player, enemy: enemy1 },
      global: {
        plugins: [pinia],
        stubs: {
          BattleAttackCursor: true,
          BattleToast: true,
          ShlagemonXpBar: true,
          BattleShlagemon: { template: '<div />' },
        },
        directives: { tooltip: () => {} },
      },
    })
    await nextTick()
    startBattle.mockClear()
    stopBattle.mockClear()

    await wrapper.setProps({ enemy: enemy2 })
    await nextTick()
    await wrapper.setProps({ enemy: enemy3 })
    await nextTick()

    expect(stopBattle).toHaveBeenCalledTimes(2)
    expect(startBattle).toHaveBeenCalledTimes(2)
    const stopOrders = stopBattle.mock.invocationCallOrder
    const startOrders = startBattle.mock.invocationCallOrder
    for (let i = 0; i < stopOrders.length; i++)
      expect(stopOrders[i]).toBeLessThan(startOrders[i])

    wrapper.unmount()
  })

  it('stops previous battle before starting new when player changes rapidly', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const player1 = dex.createShlagemon(carapouffe)
    const player2 = dex.createShlagemon(salamiches)
    const player3 = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(salamiches)
    const wrapper = mount(Round, {
      props: { player: player1, enemy },
      global: {
        plugins: [pinia],
        stubs: {
          BattleAttackCursor: true,
          BattleToast: true,
          ShlagemonXpBar: true,
          BattleShlagemon: { template: '<div />' },
        },
        directives: { tooltip: () => {} },
      },
    })
    await nextTick()
    startBattle.mockClear()
    stopBattle.mockClear()

    await wrapper.setProps({ player: player2 })
    await nextTick()
    await wrapper.setProps({ player: player3 })
    await nextTick()

    expect(stopBattle).toHaveBeenCalledTimes(2)
    expect(startBattle).toHaveBeenCalledTimes(2)
    const stopOrders = stopBattle.mock.invocationCallOrder
    const startOrders = startBattle.mock.invocationCallOrder
    for (let i = 0; i < stopOrders.length; i++)
      expect(stopOrders[i]).toBeLessThan(startOrders[i])

    wrapper.unmount()
  })
})
