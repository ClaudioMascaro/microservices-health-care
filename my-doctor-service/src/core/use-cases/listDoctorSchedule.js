function getDoctorScheduleFactory({
  doctorScheduleRepository,
  // high level dependencies
}) {
  return async function execute({
    doctorId,
    queryParams,
    // another params needed
  }) {
    try {
      return await doctorScheduleRepository.getSchedule({
        doctorId,
        queryParams,
      })
    } catch (error) {
      throw error
    }
  }
}

export default getDoctorScheduleFactory
