import AppointmentServiceFactory from './appointmentService.js'
import DoctorServiceFactory from './doctorService.js'
import AuthenticationServiceFactory from './authService.js'
import UserServiceFactory from './userService.js'

export default function servicesFactory ({ config, loadService, logger }) {
  const AppointmentService = AppointmentServiceFactory({
    config,
    loadService,
    logger,
  })

  const DoctorService = DoctorServiceFactory({
    config,
    loadService,
    logger,
  })

  const AuthenticationService = AuthenticationServiceFactory({
    config,
    loadService,
    logger,
  })

  const UserService = UserServiceFactory({
    config,
    loadService,
    logger,
  })

  return {
    AppointmentService,
    DoctorService,
    AuthenticationService,
    UserService,
  }
}
