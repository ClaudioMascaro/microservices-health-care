function affiliateDoctorFactory ({
  doctorRepository,
}) {
  return async function execute ({
    request,
  }, callback) {
    try {
      const {
        payload,
      } = request

      const params = JSON.parse(payload)

      const createdDoctor = await doctorRepository.create({
        params,
      })

      return callback(null, {
        id: createdDoctor.id,
        payload: JSON.stringify(createdDoctor),
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}

export default affiliateDoctorFactory
