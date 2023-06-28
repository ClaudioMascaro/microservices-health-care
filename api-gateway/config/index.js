import app from './app.js'
import postgres from './database/postgres.js'
import env from './env.js'
import http from './http.js'

import services from './services/index.js'

export default {
  app,
  postgres,
  env,
  http,
  services,
}
