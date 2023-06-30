import config from '../../config/index.js'

import loggerFactory from './logger/index.cjs'
import grpcServerFactory from './grpc/index.js'
import dynamoDbFactory from './database/dynamodb/index.js'

const logger = loggerFactory({ config })
const dynamoDb = dynamoDbFactory({ config, logger })
const grpcServer = grpcServerFactory({ config })

export default {
  logger,
  grpcServer,
  dynamoDb,
}
