import modules from '../modules/index.js'
import userRepositoryFactory from './repositories/userRepository.js'
import sessionRepositoryFactory from './repositories/sessionRepository.js'
import keyRepositoryFactory from './repositories/keyRepository.js'

import createUserFactory from './use-cases/createUser.js'
import authenticateUserFactory from './use-cases/authenticateUser.js'
import createSessionFactory from './use-cases/createSession.js'
import validateSessionFactory from './use-cases/validateSession.js'

const {
  postgresDatabase, encrypter, dynamoDb,
} = modules

const keyRepository = keyRepositoryFactory({
  dynamoDb,
})

const userRepository = userRepositoryFactory({
  postgresDatabase,
  encrypter,
})

const sessionRepository = sessionRepositoryFactory({
  postgresDatabase,
})

const createUser = createUserFactory({
  userRepository,
  keyRepository,
  encrypter,
})

const authenticateUser = authenticateUserFactory({
  userRepository,
  keyRepository,
  encrypter,
})

const createSession = createSessionFactory({
  sessionRepository,
})

const validateSession = validateSessionFactory({
  sessionRepository,
})

export default {
  createUser,
  authenticateUser,
  createSession,
  validateSession,
}
