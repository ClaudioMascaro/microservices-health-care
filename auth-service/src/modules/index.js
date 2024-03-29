import config from '../../config/index.js'

import loggerFactory from './logger/index.cjs'
import postgresDatabaseFactory from './database/postgres/index.js'
import grpcServerFactory from './grpc/index.js'
import loadService from './grpc/loadService.js'
import dynamoDbFactory from './database/dynamodb/index.js'
import encrypter from '../../encrypter/index.js'

const { postgres } = config

const logger = loggerFactory({ config })
const postgresDatabase = postgresDatabaseFactory({ config: postgres, logger })
const dynamoDb = dynamoDbFactory({ config, logger })
const grpcServer = grpcServerFactory({ config })

export default {
  logger,
  postgresDatabase,
  grpcServer,
  loadService,
  dynamoDb,
  encrypter: encrypter(),
}
