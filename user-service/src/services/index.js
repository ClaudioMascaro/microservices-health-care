import KeyServiceFactory from './keyService.js'

export default function servicesFactory ({ config, loadService, logger }) {
  const KeyService = KeyServiceFactory({
    config,
    loadService,
    logger,
  })

  return {
    KeyService,
  }
}
