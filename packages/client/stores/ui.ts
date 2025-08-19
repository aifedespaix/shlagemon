import { create } from 'zustand'

interface UiState {
  hp: number
  mana: number
  setHp: (hp: number) => void
  setMana: (mana: number) => void
}

/** Global UI state for HUD. */
export const useUiStore = create<UiState>(set => ({
  hp: 100,
  mana: 50,
  setHp: hp => set({ hp }),
  setMana: mana => set({ mana }),
}))
