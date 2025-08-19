import type { PrismaClient } from '@prisma/client'
import type { Redis } from 'ioredis'
import process from 'node:process'
import jwt from 'jsonwebtoken'
import { generateId } from 'lucia'

/**
 * Short-lived JWT session handling using Lucia-generated identifiers.
 * Sessions are persisted in Redis with a strict TTL.
 */
export interface AuthContext {
  redis: Redis
  prisma: PrismaClient
}

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me'
const SESSION_TTL_SECONDS = 60 // 1 minute

export async function issueJwt(ctx: AuthContext, userId: string): Promise<string> {
  const sessionId = generateId(32)
  await ctx.redis.set(`session:${sessionId}`, userId, 'EX', SESSION_TTL_SECONDS)
  return jwt.sign({ sub: userId, sid: sessionId }, JWT_SECRET, { expiresIn: SESSION_TTL_SECONDS })
}

export async function validateJwt(ctx: AuthContext, token: string): Promise<{ userId: string } | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string, sid: string }
    const stored = await ctx.redis.get(`session:${decoded.sid}`)
    if (stored !== decoded.sub)
      return null
    return { userId: decoded.sub }
  }
  catch {
    return null
  }
}
