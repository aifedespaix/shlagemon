import type { Component } from 'vue'
import type { Character } from './character'
import type { DialogNode } from './dialog'
import type { ItemId } from '~/data/items/items'

export interface MoneyReward {
  type: 'money'
  amount: number
}

export interface ItemReward {
  type: 'item'
  itemId: ItemId
}

export type MiniGameReward = MoneyReward | ItemReward

export interface MiniGameDefinition {
  id: MiniGameId
  label: string
  character: Character
  component: () => Promise<{ default: Component }>
  reward: MiniGameReward
  createIntro: (start: () => void) => DialogNode[]
  createSuccess: (done: () => void) => DialogNode[]
  createFailure: (done: () => void) => DialogNode[]
}

export type MiniGameId = 'tictactoe' | 'battleship' | 'connectfour' | 'shlagcards'
