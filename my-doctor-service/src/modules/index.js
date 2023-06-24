import config from '../../config/index.js'

import createLogger from './logger/logger.cjs'
import postgresDatabaseFactory from './database/postgres/index.js'
import grpcClientFactory from './grpc/index.js'

const { postgres } = config

const { httpLogger, logger } = createLogger({ config })
const postgresDatabase = postgresDatabaseFactory({ config: postgres, logger })
const grpcClient = grpcClientFactory({ logger })

export default {
  httpLogger,
  logger,
  postgresDatabase,
  grpcClient,
}
