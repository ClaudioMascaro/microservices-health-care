import config from '../../config/index.js'

import createLogger from './logger/logger.cjs'
import grpcClientFactory from './grpc/index.js'

const { httpLogger, logger } = createLogger({ config })
const loadService = grpcClientFactory()

export default {
  httpLogger,
  logger,
  loadService,
}
