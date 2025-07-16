import { defineStore } from 'pinia'

export const usePwaUpdateStore = defineStore('pwaUpdate', () => {
  const needRefresh = ref(false)
  let updateFn: ((reloadPage?: boolean) => Promise<void>) | null = null

  function registerUpdate(swUpdate: (reloadPage?: boolean) => Promise<void>) {
    updateFn = swUpdate
  }

  function showUpdate() {
    needRefresh.value = true
  }

  async function reload() {
    if (updateFn)
      await updateFn(true)
  }

  return { needRefresh, registerUpdate, showUpdate, reload }
})
