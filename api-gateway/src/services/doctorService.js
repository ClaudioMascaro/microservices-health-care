export default function DoctorServiceFactory ({ config, loadService, logger }) {
  const { doctorService: doctorServiceConfig } = config.services

  const DoctorService = loadService({
    serviceName: 'DoctorService',
    fileName: 'doctor',
    address: `${doctorServiceConfig.host}:${doctorServiceConfig.port}`,
  })

  logger.info({
    message: 'DoctorService loaded',
  })

  return DoctorService
}
