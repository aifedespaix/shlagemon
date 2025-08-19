import type { Client } from 'colyseus'
import type { AuthContext } from '../auth.js'
import { MapSchema, Schema, type } from '@colyseus/schema'
import { Room } from 'colyseus'
import { validateJwt } from '../auth.js'

class Player extends Schema {
  @type('number') x = 0
  @type('number') y = 0
}

class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>()
}

export interface GameRoomOptions {
  token: string
}

/**
 * Basic authoritative game room with a fixed tick rate.
 */
export class GameRoom extends Room<GameState> {
  private ctx!: AuthContext

  onCreate(options: { ctx: AuthContext }): void {
    this.ctx = options.ctx
    this.setState(new GameState())
    this.setSimulationInterval(() => this.update(), 50) // ~20Hz
    this.onMessage('input', (client, message: any) => {
      const player = this.state.players.get(client.sessionId)
      if (!player || typeof message !== 'object')
        return
      if (typeof message.x === 'number')
        player.x = message.x
      if (typeof message.y === 'number')
        player.y = message.y
    })
  }

  async onAuth(client: Client, options: GameRoomOptions): Promise<boolean> {
    const result = await validateJwt(this.ctx, options.token)
    if (!result)
      return false;
    (client as any).userId = result.userId
    return true
  }

  onJoin(client: Client): void {
    const player = new Player()
    this.state.players.set(client.sessionId, player)
  }

  onLeave(client: Client): void {
    this.state.players.delete(client.sessionId)
  }

  private update(): void {
    // Simulation tick; extend as needed.
  }
}
