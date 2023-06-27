import AppointmentServiceFactory from './appointmentService.js'
import DoctorServiceFactory from './doctorService.js'

export default function servicesFactory ({ loadService, logger }) {
  const AppointmentService = AppointmentServiceFactory({
    loadService,
    logger,
  })

  const DoctorService = DoctorServiceFactory({
    loadService,
    logger,
  })

  return {
    AppointmentService,
    DoctorService,
  }
}
