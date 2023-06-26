import config from '../../../config/index.js'
import createLogger from './logger.cjs'

const {
  logger,
  httpLogger,
} = createLogger({ config })

export default {
  logger,
  httpLogger,
}
