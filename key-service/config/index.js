import app from './app.js'
import env from './env.js'
import dynamo from './database/dynamo.js'
import grpc from './grpc.js'

const isProd = env.NODE_ENV === 'production'

export default {
  app,
  dynamo,
  env,
  grpc,
  isProd,
}
