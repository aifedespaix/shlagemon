import type { InterfaceSettings, MobileMainPanel } from '~/type'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useInterfaceStore = defineStore('interface', () => {
  const settings = reactive<InterfaceSettings>({
    mobileMainPanel: 'zone',
  })
  const { mobileMainPanel } = toRefs(settings)

  function setMobileMainPanel(panel: MobileMainPanel) {
    mobileMainPanel.value = panel
  }

  return { mobileMainPanel, setMobileMainPanel }
}, {
  persist: true,
})
