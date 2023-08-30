import config from '../../config/index.js'
import modules from '../modules/index.js'
import appointmentRepositoryFactory from './repositories/appointmentRepository.js'
import createAppointmentFactory from './use-cases/createAppointment.js'
import findAllAppointmentsFactory from './use-cases/findAllAppointments.js'
import updateAppointmentFactory from './use-cases/updateAppointment.js'
import findAvailableAppointmentsFactory from './use-cases/findAvailableAppointments.js'

import servicesFactory from '../services/index.js'

const { postgresDatabase, logger, loadService } = modules

const {
  DoctorService,
} = servicesFactory({
  config,
  logger,
  loadService,
})

const appointmentRepository = appointmentRepositoryFactory({ postgresDatabase })

const createAppointment = createAppointmentFactory({ appointmentRepository, logger })

const findAllAppointments = findAllAppointmentsFactory({
  appointmentRepository,
})

const findAvailableAppointments = findAvailableAppointmentsFactory({
  appointmentRepository,
  DoctorService,
})

const updateAppointment = updateAppointmentFactory({
  appointmentRepository,
})

export default {
  createAppointment,
  findAllAppointments,
  updateAppointment,
  findAvailableAppointments,
}
