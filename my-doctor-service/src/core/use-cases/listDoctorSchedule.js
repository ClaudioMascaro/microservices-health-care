function getDoctorAppointmentFactory({
  doctorAppointmentRepository,
  // high level dependencies
}) {
  return async function execute({
    doctorId,
    queryParams,
    // another params needed
  }) {
    try {
      return await doctorAppointmentRepository.getAppointment({
        doctorId,
        queryParams,
      })
    } catch (error) {
      throw error
    }
  }
}

export default getDoctorAppointmentFactory
