import app from './app.js'
import postgres from './database/postgres.js'
import env from './env.js'
import dynamo from './dynamo.js'
import grpc from './grpc.js'
import session from './session.js'

const isProd = env.NODE_ENV === 'production'

export default {
  app,
  postgres,
  dynamo,
  env,
  grpc,
  session,
  isProd,
}
