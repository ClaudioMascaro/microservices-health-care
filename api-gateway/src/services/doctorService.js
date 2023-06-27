export default function DoctorServiceFactory ({ loadService, logger }) {
  const DoctorService = loadService({
    serviceName: 'DoctorService',
    fileName: 'doctor',
    address: 'localhost:50052',
  })

  logger.info({
    message: 'DoctorService loaded',
  })

  return DoctorService
}
