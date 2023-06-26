import { Op } from 'sequelize'

const buildQuery = (startDate, endDate, doctorId) => {
  if (!startDate && !endDate) {
    throw new Error('missing filters')
  }

  const getStartTimeRange = () => {
    if (!startDate) {
      return {
        [Op.lte]: new Date(endDate),
      }
    }

    if (!endDate) {
      return {
        [Op.gte]: new Date(startDate),
      }
    }

    return {
      [Op.gte]: new Date(startDate),
      [Op.lte]: new Date(endDate),
    }
  }

  return {
    raw: true,
    where: {
      start_time: getStartTimeRange(),
      doctor_id: doctorId,
    },
  }
}

function AppointmentRepositoryFactory({ postgresDatabase }) {
  const { Appointments } = postgresDatabase.sequelize.models

  async function create({ params }) {
    try {
      return await Appointments.create(params)
    } catch (error) {
      throw error
    }
  }

  async function listByDoctorId({ queryParams }) {
    try {
      const { startDate, endDate, doctorId } = queryParams

      const query = buildQuery(startDate, endDate, doctorId)
      return await Appointments.findAll(query, { raw: true })
    } catch (error) {
      throw error
    }
  }

  async function update({ params, appointmentId }) {
    try {
      const query = {
        where: {
          id: appointmentId,
        },
      }

      return await Appointments.findAll(params, query)
    } catch (error) {
      throw error
    }
  }

  return {
    create,
    listByDoctorId,
    update,
  }
}

export default AppointmentRepositoryFactory
