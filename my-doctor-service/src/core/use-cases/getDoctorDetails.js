function getDoctorDetailsFactory({
  doctorRepository,
  // high level dependencies
}) {
  return async function execute({
    doctorId,
    // another params needed
  }) {
    try {
      return await doctorRepository.getDetails({
        doctorId,
      })
    } catch (error) {
      throw error
    }
  }
}

export default getDoctorDetailsFactory
