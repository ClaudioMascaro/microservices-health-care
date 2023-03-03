function updateDoctorDetailsFactory({
  doctorRepository,
  // high level dependencies
}) {
  return async function execute({ doctorId, params }) {
    try {
      return await doctorRepository.updateDetails({
        doctorId,
        params,
      })
    } catch (error) {
      throw error
    }
  }
}

export default updateDoctorDetailsFactory
