import { Op } from 'sequelize'

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

      const query = {
        raw: true,
        where: {
          start_time: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
          },
          doctor_id: doctorId,
        },
      }

      return await Appointments.findAll({ raw: true })
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
