function updateDoctorScheduleFactory({
  doctorScheduleRepository,
  // high level dependencies
}) {
  return async function execute({ doctorId, appointment, params }) {
    try {
      return await doctorScheduleRepository.updateSchedule({
        doctorId,
        appointment,
        params,
      })
    } catch (error) {
      throw error
    }
  }
}

export default updateDoctorScheduleFactory
