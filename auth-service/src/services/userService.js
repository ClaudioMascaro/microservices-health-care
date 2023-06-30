export default function UserServiceFactory ({ config, loadService, logger }) {
  const { userService: userServiceConfig } = config.services

  const UserService = loadService({
    serviceName: 'UserService',
    fileName: 'user',
    address: `${userServiceConfig.host}:${userServiceConfig.port}`,
  })

  logger.info({
    message: 'UserService loaded',
  })

  return UserService
}
