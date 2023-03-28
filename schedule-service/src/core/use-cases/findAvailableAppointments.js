function findAvailableAppointmentsFactory({ appointmentRepository }) {
  return async function execute({ doctorId, startDate, endDate }) {
    try {
      const appointments = await appointmentRepository.listByDoctorId({
        queryParams: {
          doctorId,
          startDate,
          endDate,
        },
      })

      return appointments.map(({ id, ...appointmentData }) => ({
        id,
        payload: JSON.stringify(appointmentData),
      }))
    } catch (error) {
      throw error
    }
  }
}

export default findAvailableAppointmentsFactory
