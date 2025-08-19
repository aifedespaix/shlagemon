import process from 'node:process'
import { createServer } from './server.js'

const port = Number(process.env.PORT) || 3000

createServer().then(({ fastify }) => {
  fastify.listen({ port, host: '0.0.0.0' }).catch((err) => {
    fastify.log.error(err)
    process.exit(1)
  })
})
