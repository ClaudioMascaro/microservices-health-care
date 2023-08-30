import DoctorServiceFactory from './doctorService.js'

export default function servicesFactory ({ config, loadService, logger }) {
  const DoctorService = DoctorServiceFactory({
    config,
    loadService,
    logger,
  })

  return {
    DoctorService,
  }
}
