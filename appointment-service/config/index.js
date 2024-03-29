import app from './app.js'
import postgres from './database/postgres.js'
import env from './env.js'
import grpc from './grpc.js'
import services from './services/index.js'

export default {
  app,
  postgres,
  env,
  grpc,
  services,
}
