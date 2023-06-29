import doctorControllerFactory from './doctor.js'
import appointmentControllerFactory from './appointment.js'
import userControllerFactory from './user.js'

export default function controllersFactory ({ services }) {
  const { AppointmentService, DoctorService, AuthenticationService } = services

  const doctorController = doctorControllerFactory({ DoctorService })
  const appointmentController = appointmentControllerFactory({ AppointmentService })
  const userController = userControllerFactory({ AuthenticationService })

  return {
    doctorController,
    appointmentController,
    userController,
  }
}
