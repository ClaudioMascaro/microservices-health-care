import modules from '../modules/index'

const { postgresDatabase } = modules

import appointmentRepositoryFactory from './repositories/appointmentRepository'
import createAppointmentFactory from './use-cases/createAppointment'
import findAvailableAppointmentsFactory from './use-cases/findAvailableAppointments'
import updateAppointmentFactory from './use-cases/updateAppointment'

const appointmentRepository = appointmentRepositoryFactory({ postgresDatabase })

const createAppointment = createAppointmentFactory({ appointmentRepository })

const findAvailableAppointments = findAvailableAppointmentsFactory({
  appointmentRepository,
})

const updateAppointment = updateAppointmentFactory({
  appointmentRepository,
})

export default {
  createAppointment,
  findAvailableAppointments,
  updateAppointment,
}
