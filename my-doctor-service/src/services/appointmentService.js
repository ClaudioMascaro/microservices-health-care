export default function AppointmentServiceFactory ({ create, findAll }) {
  async function createAppointment ({ appointment }) {
    return create({ payload: JSON.stringify(appointment) })
  }

  async function findAllAppointments ({ params }) {
    return findAll({ params: JSON.stringify(params) })
  }

  return {
    createAppointment,
    findAllAppointments,
  }
}
