function findAllAppointmentsFactory({ appointmentRepository }) {
  return async function execute({ doctorId, startDate, endDate }) {
    try {
      return await appointmentRepository.listByDoctorId({
        queryParams: {
          doctorId: Number(doctorId),
          startDate,
          endDate,
        },
      })
    } catch (error) {
      throw error
    }
  }
}

export default findAllAppointmentsFactory
