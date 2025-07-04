import type { Character } from '~/type/character'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const pseudo = ref('')
  const realName = ref('')
  const gender = ref<Character['gender']>('unknown')

  const character = computed<Character>(() => ({
    id: 'player',
    name: pseudo.value,
    gender: gender.value,
  }))

  function setPlayer(data: {
    pseudo: string
    realName: string
    gender: Character['gender']
  }) {
    pseudo.value = data.pseudo
    realName.value = data.realName
    gender.value = data.gender
  }

  function reset() {
    pseudo.value = ''
    realName.value = ''
    gender.value = 'unknown'
  }

  return { pseudo, realName, gender, character, setPlayer, reset }
}, {
  persist: true,
})
