function getDoctorDetailsFactory({
  doctorRepository,
  // high level dependencies
}) {
  return async function execute({
    queryParams,
    // another params needed
  }) {
    try {
      return await doctorRepository.list({
        queryParams,
      })
    } catch (error) {
      throw error
    }
  }
}

export default getDoctorDetailsFactory
