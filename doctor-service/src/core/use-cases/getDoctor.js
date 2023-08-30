export default function getDoctorFactory ({ doctorRepository }) {
  return async function execute ({
    request,
  }, callback) {
    try {
      const {
        id,
      } = request

      const doctor = await doctorRepository.findOneById({
        id: Number(id),
      })
      console.log('🚀 ~ file: getDoctor.js:13 ~ getDoctorFactory ~ doctor:', doctor)

      return callback(null, {
        id: doctor.id,
        payload: JSON.stringify(doctor),
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}
