import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import Round from '../src/components/battle/Round.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

const playerFainted = ref(false)
const enemyFainted = ref(false)
const playerHp = ref(0)
const enemyHp = ref(1)

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
    startBattle: vi.fn(),
    stopBattle: vi.fn(),
    attack: vi.fn(),
  }),
}))

describe('battle round faint fallback', () => {
  it('emits end if faintEnd not received within animation duration', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    const wrapper = mount(Round, {
      props: { player, enemy },
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

    playerFainted.value = true
    await nextTick()
    await vi.advanceTimersByTimeAsync(600)

    const events = wrapper.emitted('end')
    expect(events).toBeTruthy()
    expect(events![0][0]).toBe('lose')

    wrapper.unmount()
    vi.useRealTimers()
  })
})
