export default function AppointmentServiceFactory({ create, findAll }) {
  async function createAppointment({ appointment }) {
    return await create({ payload: JSON.stringify(appointment) })
  }

  async function findAllAppointments({ params }) {
    return await findAll({ params: JSON.stringify(params) })
  }

  return {
    createAppointment,
    findAllAppointments,
  }
}
