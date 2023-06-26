function findAllAppointmentsFactory ({ appointmentRepository }) {
  return async function execute ({ request }, callback) {
    try {
      const { params } = request

      const { doctorId, startDate = false, endDate = false } = JSON.parse(params)

      const appointments = await appointmentRepository.listByDoctorId({
        queryParams: {
          doctorId: Number(doctorId),
          startDate,
          endDate,
        },
      })

      return callback(null, {
        appointments: appointments.map((appointment) => ({
          id: appointment.id,
          payload: JSON.stringify(appointment),
        })),
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}

export default findAllAppointmentsFactory
