import modules from '../modules/index.js'
import appointmentRepositoryFactory from './repositories/appointmentRepository.js'
import createAppointmentFactory from './use-cases/createAppointment.js'
import findAllAppointmentsFactory from './use-cases/findAllAppointments.js'
import updateAppointmentFactory from './use-cases/updateAppointment.js'

const { postgresDatabase, logger } = modules

const appointmentRepository = appointmentRepositoryFactory({ postgresDatabase })

const createAppointment = createAppointmentFactory({ appointmentRepository, logger })

const findAllAppointments = findAllAppointmentsFactory({
  appointmentRepository,
})

const updateAppointment = updateAppointmentFactory({
  appointmentRepository,
})

export default {
  createAppointment,
  findAllAppointments,
  updateAppointment,
}
