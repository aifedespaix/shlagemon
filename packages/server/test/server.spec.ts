import { Client } from 'colyseus.js'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { createServer } from '../src/server.js'

let port: number
let close: () => Promise<void>

beforeAll(async () => {
  const { fastify, ctx } = await createServer()
  // mock user lookup
  vi.spyOn(ctx.prisma.user, 'findUnique').mockResolvedValue({ id: 'user1', name: 'Test' } as any)
  await fastify.listen({ port: 0 })
  const address = fastify.server.address()
  if (typeof address === 'object' && address) {
    port = address.port
  }
  else {
    throw new Error('no port')
  }
  close = async () => {
    await fastify.close()
    await ctx.redis.disconnect()
    await ctx.prisma.$disconnect()
  }
})

afterAll(async () => {
  await close()
})

describe('fastify endpoints', () => {
  it('returns healthz', async () => {
    const res = await fetch(`http://localhost:${port}/healthz`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.status).toBe('ok')
  })

  it('returns time', async () => {
    const res = await fetch(`http://localhost:${port}/time`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(typeof json.time).toBe('number')
  })
})

describe('colyseus integration', () => {
  it.skip('issues token and synchronizes state', async () => {
    const tokenRes = await fetch(`http://localhost:${port}/auth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId: 'user1' }),
    })
    const { token } = await tokenRes.json() as { token: string }
    const client = new Client(`ws://localhost:${port}`)
    const room = await client.joinOrCreate('game', { token })

    const player = room.state.players.get(room.sessionId)
    if (!player)
      throw new Error('player missing')
    await new Promise<void>((resolve) => {
      player.onChange(() => {
        if (player.x === 1)
          resolve()
      })
      room.send('input', { x: 1 })
    })

    await room.leave()
  })
})
