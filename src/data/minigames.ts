import type { MiniGameDefinition } from '~/type/minigame'
import { battleshipMiniGame } from './Minigame/Battleship'
import { connectFourMiniGame } from './Minigame/ConnectFour'
import { shlagCardsMiniGame } from './Minigame/ShlagCards'
import { ticTacToeMiniGame } from './Minigame/TicTacToe'

export const miniGames: MiniGameDefinition[] = [
  ticTacToeMiniGame,
  battleshipMiniGame,
  connectFourMiniGame,
  shlagCardsMiniGame,
]

export function getMiniGame(id: string): MiniGameDefinition | undefined {
  return miniGames.find(g => g.id === id)
}
