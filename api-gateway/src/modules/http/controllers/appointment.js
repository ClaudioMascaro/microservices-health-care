export default function appointmentControllerFactory ({ AppointmentService }) {
  async function create ({ params, body }) {
    const { id: doctorId } = params

    const createdAppointment = await AppointmentService.createAppointment({
      payload: JSON.stringify({
        doctorId,
        ...body,
      }),
    })

    return {
      body: JSON.parse(createdAppointment.payload),
      statusCode: 201,
    }
  }

  async function list ({ params, query }) {
    const { id: doctorId } = params

    const { appointments } = await AppointmentService.findAllAppointments({
      params: JSON.stringify({
        doctorId,
        ...query,
      }),
    })

    return {
      body: appointments.map(({ payload }) => ({ ...JSON.parse(payload) })),
      statusCode: 200,
    }
  }

  async function findAvailable ({ params, query }) {
    const { id: doctorId } = params

    const { appointments } = await AppointmentService.findAvailableAppointments({
      params: JSON.stringify({
        doctorId,
        ...query,
      }),
    })

    return {
      body: appointments.map(({ payload }) => ({ ...JSON.parse(payload) })),
      statusCode: 200,
    }
  }

  return {
    create,
    list,
    findAvailable,
  }
}
