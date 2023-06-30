import KeyServiceFactory from './keyService.js'
import UserServiceFactory from './userService.js'

export default function servicesFactory ({ config, loadService, logger }) {
  const KeyService = KeyServiceFactory({
    config,
    loadService,
    logger,
  })

  const UserService = UserServiceFactory({
    config,
    loadService,
    logger,
  })

  return {
    KeyService,
    UserService,
  }
}
