import modules from '../modules/index.js'
import keyRepositoryFactory from './repositories/keyRepository.js'

import createKeyFactory from './use-cases/createKey.js'
import findKeyFactory from './use-cases/findKey.js'


const {
  dynamoDb,
} = modules

const keyRepository = keyRepositoryFactory({
  dynamoDb,
})

const createKey = createKeyFactory({
  keyRepository,
})

const findKey = findKeyFactory({
  keyRepository,
})

export default {
  createKey,
  findKey,
}
