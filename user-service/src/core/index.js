import config from '../../config/index.js'
import modules from '../modules/index.js'
import userRepositoryFactory from './repositories/userRepository.js'

import servicesFactory from '../services/index.js'

import createUserFactory from './use-cases/createUser.js'
import findUserFactory from './use-cases/findUser.js'

const {
  postgresDatabase, encrypter, logger, loadService
} = modules

const {
  KeyService,
} = servicesFactory({
  config,
  logger,
  loadService,
})

const userRepository = userRepositoryFactory({
  postgresDatabase,
})

const createUser = createUserFactory({
  userRepository,
  KeyService,
  encrypter,
})

const findUser = findUserFactory({
  userRepository,
})

export default {
  createUser,
  findUser,
}
