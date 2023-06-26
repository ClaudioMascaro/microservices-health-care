import AppointmentServiceFactory from './appointmentService.js'

export default function servicesFactory ({ grpcServices }) {
  const { createAppointment, findAllAppointments } = grpcServices

  const appointmentService = AppointmentServiceFactory({
    create: createAppointment,
    findAll: findAllAppointments,
  })

  return {
    appointmentService,
  }
}
