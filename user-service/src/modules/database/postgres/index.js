import Sequelize from 'sequelize'

import rawModels from './models/index.js'

function postgresDatabaseFactory ({ config, logger }) {
  const baseConfig = {
    database: config.database,
    dialect: config.dialect,
    host: config.host,
    password: config.password,
    pool: {
      acquire: 20000,
      handleDisconnects: true,
      idle: 60000,
    },
    username: config.username,
    logging: false,
    define: {
      createdAt: 'created_at',
      timestamps: true,
      updatedAt: 'updated_at',
    },
  }

  const database = new Sequelize(baseConfig)

  function setupDatabase () {
    const defineInstance = (model) => ({
      model,
      instance: model.define(database),
    })

    Object.values(rawModels).map(defineInstance)
  }

  try {
    logger.info({ message: 'Setup and configure database' })
    setupDatabase()
  } catch (error) {
    logger.error({
      message: 'Error setting and configuring database',
      error: error.message,
      stack: error.stack ? error.stack.split('\n') : null,
    })

    throw error
  }

  async function start () {
    try {
      logger.info({ message: 'Attempting database authentication' })
      await database.authenticate()
      logger.info({ message: 'Database authentication successful' })
    } catch (error) {
      logger.error({
        message: 'Cannot authenticate',
        error: error.message,
        stack: error.stack ? error.stack.split('\n') : null,
      })

      throw error
    }
  }

  async function stop () {
    try {
      logger.info({ message: 'Stopping database' })
      await database.close()
      logger.info({ message: 'Database stopped' })
    } catch (error) {
      logger.error({
        message: 'Cannot stop database',
        error: error.message,
        stack: error.stack ? error.stack.split('\n') : null,
      })

      throw error
    }
  }

  return {
    start,
    stop,
    sequelize: database,
  }
}

export default postgresDatabaseFactory
