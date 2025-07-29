import type { MiniGameDefinition } from '~/type/minigame'
import { battleshipMiniGame } from './Minigame/Battleship'
import { connectFourMiniGame } from './Minigame/ConnectFour'
import { shlagMindMiniGame } from './Minigame/MasterMind'
import { shlagPairsMiniGame } from './Minigame/Pairs'
import { shlagTaquinMiniGame } from './Minigame/Taquin'
import { ticTacToeMiniGame } from './Minigame/TicTacToe'

export const miniGames: MiniGameDefinition[] = [
  ticTacToeMiniGame,
  battleshipMiniGame,
  connectFourMiniGame,
  shlagMindMiniGame,
  shlagPairsMiniGame,
  shlagTaquinMiniGame,
]

export function getMiniGame(id: string): MiniGameDefinition | undefined {
  return miniGames.find(g => g.id === id)
}
