export default function AuthenticationServiceFactory ({ config, loadService, logger }) {
  const { authService: authServiceConfig } = config.services

  const AuthenticationService = loadService({
    serviceName: 'AuthenticationService',
    fileName: 'auth',
    address: `${authServiceConfig.host}:${authServiceConfig.port}`,
  })

  logger.info({
    message: 'AuthenticationService loaded',
  })

  return AuthenticationService
}
