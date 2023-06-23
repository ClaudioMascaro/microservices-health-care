import config from '../../config'
import createLogger from './logger'

const {
  logger,
  httpLogger,
} = createLogger({ config })

export default {
  logger,
  httpLogger,
}
