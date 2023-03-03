function updateDoctorAppointmentFactory({
  doctorAppointmentRepository,
  // high level dependencies
}) {
  return async function execute({ doctorId, appointment, params }) {
    try {
      return await doctorAppointmentRepository.updateAppointment({
        doctorId,
        appointment,
        params,
      })
    } catch (error) {
      throw error
    }
  }
}

export default updateDoctorAppointmentFactory
