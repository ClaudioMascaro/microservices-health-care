import config from '../config/index.js'
import modules from './modules/index.js'
import httpServerFactory from './modules/http/server.js'
import routesFactory from './modules/http/routes/index.js'
import controllersFactory from './modules/http/controllers/index.js'
import servicesFactory from './services/index.js'

const { logger, httpLogger, loadService } = modules

const services = servicesFactory({ loadService, logger })
const controllers = controllersFactory({ services })
const routes = routesFactory({ controllers })

const httpServer = httpServerFactory({
  logger,
  httpLogger,
  config,
  routes,
})

function applicationFactory () {
  async function start () {
    try {
      logger.info({
        message: 'Starting application',
      })

      httpServer.start()
    } catch (error) {
      logger.error({
        message: 'Unexpected error starting application',
        error: error.message,
        stack: error.stack?.split('\n'),
      })

      throw error
    }
  }

  async function stop () {
    try {
      logger.info({
        message: 'Stopping application',
      })

      httpServer.stop()
    } catch (error) {
      logger.error(error)
    }
  }

  return {
    start,
    stop,
  }
}

export default applicationFactory
