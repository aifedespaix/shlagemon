import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ShlagemonListGeneric from '../src/components/shlagemon/ListGeneric.vue'
import { useBusyShlagemonIds } from '../src/composables/useBusyShlagemonIds'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('busy shlagemon selection', () => {
  it('disables busy shlagémon in selection lists', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setBusy(mon.id, true)
    const busyIds = useBusyShlagemonIds()
    expect(busyIds.value).toEqual([mon.id])
    const wrapper = mount(ShlagemonListGeneric, {
      props: { disabledIds: busyIds.value },
      global: { plugins: [pinia], directives: { tooltip: () => {} } },
    })
    await wrapper.vm.$nextTick()
    const item = wrapper.find('[role="option"]')
    await item.trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })
})
