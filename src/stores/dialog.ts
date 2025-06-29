import { defineStore } from 'pinia'

export interface DialogDone {
  [id: string]: boolean
}

export const useDialogStore = defineStore('dialog', () => {
  const done = ref<DialogDone>({})

  function isDone(id: string) {
    return done.value[id] === true
  }

  function markDone(id: string) {
    done.value[id] = true
  }

  function reset() {
    done.value = {}
  }

  return { done, isDone, markDone, reset }
}, {
  persist: true,
})
