import config from '../../config/index'

import loggerFactory from './logger/index'
import postgresDatabaseFactory from './database/postgres/index'

const { postgres } = config

const logger = loggerFactory({ config })
const postgresDatabase = postgresDatabaseFactory({ config: postgres, logger })

export default {
  logger,
  postgresDatabase,
}
