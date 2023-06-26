function affiliateDoctorFactory ({
  doctorRepository,
}) {
  return async function execute ({
    params,
  }) {
    try {
      return await doctorRepository.create({
        params,
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}

export default affiliateDoctorFactory
