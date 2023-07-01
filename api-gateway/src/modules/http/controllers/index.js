import doctorControllerFactory from './doctor.js'
import appointmentControllerFactory from './appointment.js'
import userControllerFactory from './user.js'
import errorHandler from '../../error/errorHandler.js'

export default function controllersFactory ({ services }) {
  const {
    AppointmentService,
    DoctorService,
    AuthenticationService,
    UserService,
  } = services

  const doctorController = doctorControllerFactory({ DoctorService, errorHandler })
  const appointmentController = appointmentControllerFactory({ AppointmentService, errorHandler })
  const userController = userControllerFactory({ UserService, AuthenticationService, errorHandler })

  return {
    doctorController,
    appointmentController,
    userController,
  }
}
