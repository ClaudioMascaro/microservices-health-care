import config from '../../config/index.js'

import loggerFactory from './logger/index.cjs'
import postgresDatabaseFactory from './database/postgres/index.js'
import grpcServerFactory from './grpc/index.js'

const { postgres } = config

const logger = loggerFactory({ config })
const postgresDatabase = postgresDatabaseFactory({ config: postgres, logger })

export default {
  logger,
  postgresDatabase,
  grpcServerFactory,
}
