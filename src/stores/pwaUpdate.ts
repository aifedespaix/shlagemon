import { defineStore } from 'pinia'

export const usePwaUpdateStore = defineStore('pwaUpdate', () => {
  const needRefresh = ref(false)
  let updateFn: (() => Promise<void>) | null = null

  function registerUpdate(swUpdate: () => Promise<void>) {
    updateFn = swUpdate
  }

  function showUpdate() {
    needRefresh.value = true
  }

  async function reload() {
    if (updateFn)
      await updateFn()
    window.location.reload()
  }

  return { needRefresh, registerUpdate, showUpdate, reload }
})
