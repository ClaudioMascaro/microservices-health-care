function createDoctorScheduleFactory({
  doctorScheduleRepository,
  // high level dependencies
}) {
  return async function execute({ doctorId, appointment, params }) {
    try {
      return await doctorScheduleRepository.createSchedule({
        doctorId,
        appointment,
        params,
      })
    } catch (error) {
      throw error
    }
  }
}

export default createDoctorScheduleFactory
