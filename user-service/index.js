import applicationFactory from './src/index.js'

import modules from './src/modules/index.js'

const { logger } = modules

const application = applicationFactory()

async function main () {
  try {
    await application.start()

    process.on('SIGTERM', async () => {
      await application.stop()
      process.exit(0)
    })
  } catch (error) {
    logger.fatal({
      message: 'Unexpected error starting application',
      error: error.message,
      stack: error.stack?.split('\n'),
    })

    throw error
  }
}

main()
