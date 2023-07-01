import app from './app.js'
import postgres from './database/postgres.js'
import env from './env.js'
import grpc from './grpc.js'

const isProd = env.NODE_ENV === 'production'

export default {
  app,
  postgres,
  env,
  grpc,
  isProd,
}
