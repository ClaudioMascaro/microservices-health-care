export default function doctorControllerFactory ({ affiliateDoctor, appointmentService }) {
  async function affiliate ({ body: params }) {
    const body = await affiliateDoctor({ params })

    return {
      body,
      statusCode: 201,
    }
  }

  async function createAppointment({ params, body }) {
    const { id: doctorId } = params 

    const createdAppointment = await appointmentService.createAppointment({ 
      appointment: {
        doctorId,
        ...body,
      },
    })

    return {
      body: createdAppointment.payload,
      statusCode: 201,
    }
  }

  async function findAllAppointments({ params, query }) {
    const { id: doctorId } = params

    const appointments = await appointmentService.findAllAppointments({ params: {
      doctorId,
      ...query,
    } })

    return {
      body: appointments.map(({ payload }) => ({ ...payload })),
      statusCode: 200,
    }
  }

  return {
    createAppointment,
    affiliate,
    findAllAppointments,
  } 
}
