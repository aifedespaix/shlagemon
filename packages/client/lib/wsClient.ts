import type { EcsStore, Snapshot } from './ecs'

export interface InputMessage {
  x: number
  y: number
}

/**
 * Basic WebSocket client exchanging inputs and snapshots.
 */
export class WsClient {
  private socket?: WebSocket

  constructor(private url: string, private ecs: EcsStore) {}

  connect(): void {
    this.socket = new WebSocket(this.url)
    this.socket.addEventListener('message', (ev) => {
      try {
        const snapshot = JSON.parse(ev.data as string) as Snapshot
        this.ecs.applySnapshot(snapshot)
      }
      catch (err) {
        console.error('Invalid snapshot', err)
      }
    })
  }

  sendInput(input: InputMessage): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN)
      return
    this.socket.send(JSON.stringify({ type: 'input', ...input }))
  }
}
