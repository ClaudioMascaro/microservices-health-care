import AppointmentServiceFactory from "./appointmentService.js"

export default function servicesFactory({ grpcClient }) {
  const { createAppointment } = grpcClient

  const appointmentService = AppointmentServiceFactory({ appointmentCreate: createAppointment })

  return {
    appointmentService
  }
}
