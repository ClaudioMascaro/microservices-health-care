export default function KeyServiceFactory ({ config, loadService, logger }) {
  const { keyService: keyServiceConfig } = config.services

  const KeyService = loadService({
    serviceName: 'KeyService',
    fileName: 'key',
    address: `${keyServiceConfig.host}:${keyServiceConfig.port}`,
  })

  logger.info({
    message: 'KeyService loaded',
  })

  return KeyService
}
