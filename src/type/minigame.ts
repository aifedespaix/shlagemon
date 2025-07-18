import type { Character } from './character'
import type { DialogNode } from './dialog'
import type { Component } from 'vue'

export interface MiniGameDefinition {
  id: MiniGameId
  label: string
  character: Character
  component: () => Promise<{ default: Component }>
  reward: number
  createIntro: (start: () => void) => DialogNode[]
  createSuccess: (done: () => void) => DialogNode[]
  createFailure: (done: () => void) => DialogNode[]
}

export type MiniGameId = 'tictactoe'
