import config from '../../config/index.js'
import modules from '../modules/index.js'
import sessionRepositoryFactory from './repositories/sessionRepository.js'

import servicesFactory from '../services/index.js'

import authenticateUserFactory from './use-cases/authenticateUser.js'
import validateSessionFactory from './use-cases/validateSession.js'

const {
  postgresDatabase,
  encrypter,
  loadService,
  logger,
} = modules

const {
  UserService,
} = servicesFactory({
  config,
  logger,
  loadService,
})

const sessionRepository = sessionRepositoryFactory({
  postgresDatabase,
})

const authenticateUser = authenticateUserFactory({
  UserService,
  sessionRepository,
  encrypter,
})

const validateSession = validateSessionFactory({
  sessionRepository,
  config,
})

export default {
  authenticateUser,
  validateSession,
}
