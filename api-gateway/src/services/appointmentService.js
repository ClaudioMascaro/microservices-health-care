export default function AppointmentServiceFactory ({ config, loadService, logger }) {
  const { appointmentService: appointmentServiceConfig } = config.services
  console.log('🚀 ~ file: appointmentService.js:3 ~ AppointmentServiceFactory ~ appointmentServiceConfig:', appointmentServiceConfig)

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
