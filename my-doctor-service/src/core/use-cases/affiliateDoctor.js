function affiliateDoctorFactory({
  doctorRepository,
  // high level dependencies
}) {
  return async function execute({
    params,
    // another params needed
  }) {
    try {
      // business logic

      const affiliatedDoctor = await doctorRepository.create({
        params,
      })
      console.log("🚀 ~ file: affiliateDoctor.js:15 ~ affiliatedDoctor:", affiliatedDoctor)

      return {
        message: 'Success affiliating a new professional',
        cadastro: affiliatedDoctor,
      }
    } catch (error) {
      throw error
    }
  }
}

export default affiliateDoctorFactory
