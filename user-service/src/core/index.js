
import modules from '../modules/index.js'
import userRepositoryFactory from './repositories/userRepository.js'

import createUserFactory from './use-cases/createUser.js'
import findUserFactory from './use-cases/findUser.js'

const {
  postgresDatabase, encrypter,
} = modules

const userRepository = userRepositoryFactory({
  postgresDatabase,
})

const createUser = createUserFactory({
  userRepository,
  encrypter,
})

const findUser = findUserFactory({
  userRepository,
})

export default {
  createUser,
  findUser,
}
