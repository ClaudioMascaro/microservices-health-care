import app from './app.js'
import postgres from './database/postgres.js'
import env from './env.js'
import dynamo from './database/dynamo.js'
import grpc from './grpc.js'
import services from './services/index.js'

const isProd = env.NODE_ENV === 'production'

export default {
  app,
  postgres,
  dynamo,
  env,
  grpc,
  isProd,
  services,
}
