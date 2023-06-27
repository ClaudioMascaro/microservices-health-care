import doctorControllerFactory from './doctor.js'
import appointmentControllerFactory from './appointment.js'

export default function controllersFactory ({ services }) {
  const { AppointmentService, DoctorService } = services

  const doctorController = doctorControllerFactory({ DoctorService })
  const appointmentController = appointmentControllerFactory({ AppointmentService })

  return {
    doctorController,
    appointmentController,
  }
}
