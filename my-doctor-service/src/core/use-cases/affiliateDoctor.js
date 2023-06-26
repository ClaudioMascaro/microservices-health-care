function affiliateDoctorFactory({
  doctorRepository,
}) {
  return async function execute({
    params,
  }) {
    try {
      return await doctorRepository.create({
        params,
      })

    } catch (error) {
      throw error
    }
  }
}

export default affiliateDoctorFactory
