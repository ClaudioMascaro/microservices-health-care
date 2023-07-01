import UserServiceFactory from './userService.js'

export default function servicesFactory ({ config, loadService, logger }) {
  const UserService = UserServiceFactory({
    config,
    loadService,
    logger,
  })

  return {
    UserService,
  }
}
