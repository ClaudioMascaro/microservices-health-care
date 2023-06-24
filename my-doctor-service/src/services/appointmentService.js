export default function AppointmentServiceFactory({ appointmentCreate }) {
  async function createAppointment({ body }) {
    const { data } = body

    const createdAppointment = await appointmentCreate({ appointment: { payload: JSON.stringify(data) } })

    return {
      body: {
        data: createdAppointment,
      },
      statusCode: 201,
    }
  }

  return {
    createAppointment,
  }
}
