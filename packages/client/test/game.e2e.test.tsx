import { fireEvent, render } from '@testing-library/react'
import { Server } from 'mock-socket'
import React from 'react'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import GameCanvas from '../app/play/GameCanvas'
import { useUiStore } from '../stores/ui'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useFrame: () => {},
}))

let server: Server
let lastInput: any

beforeEach(() => {
  lastInput = null
  server = new Server('ws://localhost:2567')
  server.on('connection', (socket) => {
    socket.on('message', (data) => {
      lastInput = JSON.parse(data.toString())
    })
  })
})

afterEach(() => {
  server.stop()
})

/**
 * Connects to the WebSocket server and sends a movement input.
 */
it('connect and move updates HUD', async () => {
  const view = render(<GameCanvas />)
  await new Promise(r => setTimeout(r, 10))
  fireEvent.keyDown(window, { code: 'KeyW' })
  await new Promise(r => setTimeout(r, 10))
  expect(lastInput).toMatchObject({ type: 'input', x: 0, y: 1 })
  const { setHp } = useUiStore.getState()
  setHp(80)
  await new Promise(r => setTimeout(r, 0))
  // HUD renders hp label
  expect(view.getByText('HP')).toBeDefined()
})
