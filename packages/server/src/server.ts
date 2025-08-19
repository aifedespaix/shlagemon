import type { AuthContext } from './auth.js'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { Server } from 'colyseus'
import Fastify from 'fastify'
import { Redis } from 'ioredis'
import { issueJwt, validateJwt } from './auth.js'
import { GameRoom } from './rooms/GameRoom.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Create a Fastify server instance with Colyseus rooms and JWT authentication.
 */
export async function createServer() {
  const fastify = Fastify({ logger: true })
  await fastify.register(cors)

  const redis = process.env.NODE_ENV === 'test'
  // eslint-disable-next-line new-cap
    ? new (await import('ioredis-mock')).default()
    : new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379')
  const prisma = new PrismaClient()
  const ctx: AuthContext = { redis, prisma }

  // Routes
  fastify.get('/healthz', async () => ({ status: 'ok' }))
  fastify.get('/time', async () => ({ time: Date.now() }))
  fastify.get('/version', async () => {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'))
    return { version: pkg.version }
  })

  fastify.post<{ Body: { userId: string } }>('/auth/token', async (req, reply) => {
    const { userId } = req.body
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      reply.code(401)
      return { error: 'invalid user' }
    }
    const token = await issueJwt(ctx, userId)
    return { token }
  })

  fastify.get('/auth/validate', async (req, reply) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      reply.code(401)
      return { error: 'missing token' }
    }
    const [, token] = authHeader.split(' ')
    const result = await validateJwt(ctx, token)
    if (!result) {
      reply.code(401)
      return { error: 'invalid token' }
    }
    return { userId: result.userId }
  })

  // Colyseus + Fastify integration
  const gameServer = new Server({ server: fastify.server })
  gameServer.define('game', GameRoom, { ctx })

  return { fastify, gameServer, ctx }
}
