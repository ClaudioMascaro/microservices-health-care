export default function AppointmentServiceFactory ({ config, loadService, logger }) {
  const { appointmentService: appointmentServiceConfig } = config.services

  const AppointmentService = loadService({
    serviceName: 'AppointmentService',
    fileName: 'appointment',
    address: `${appointmentServiceConfig.host}:${appointmentServiceConfig.port}`,
  })

  logger.info({
    message: 'AppointmentService loaded',
  })

  return AppointmentService
}
