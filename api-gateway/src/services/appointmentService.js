export default function AppointmentServiceFactory ({ loadService, logger }) {
  const appointmentService = loadService({
    serviceName: 'AppointmentService',
    fileName: 'appointment',
    address: 'localhost:50051',
  })

  logger.info({
    message: 'AppointmentService loaded',
  })

  return appointmentService
}
