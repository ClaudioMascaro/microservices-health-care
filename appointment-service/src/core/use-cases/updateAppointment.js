function updateAppointmentFactory ({ appointmentRepository }) {
  return async function execute ({ params, appointmentId }) {
    try {
      return await appointmentRepository.update({
        params,
        appointmentId,
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}

export default updateAppointmentFactory
