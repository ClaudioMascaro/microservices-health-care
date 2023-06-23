// this app is a microservice that will handle appoinments
// it will communicate via gRPC with the main server
// it will also communicate with the database
// it will use js module

import core from './core/index.js'

import modules from './modules/index.js'

const { logger, grpcServerFactory, postgresDatabase } = modules

const grpcServer = grpcServerFactory({ core, logger })

function applicationFactory() {
  async function start() {
    try {
      logger.info({
        message: 'Starting application',
      })

      await postgresDatabase.start()

      await grpcServer.start()
    } catch (error) {
      logger.error({
        message: 'Unexpected error starting application',
        error: error.message,
        stack: error.stack?.split('\n'),
      })

      throw error
    }
  }

  async function stop() {
    try {
      logger.info({
        message: 'Stopping application',
      })

      await grpcServer.stop()
      await postgresDatabase.stop()
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