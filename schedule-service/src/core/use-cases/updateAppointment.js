function updateAppointmentFactory({ appointmentRepository }) {
  return async function execute({ params, appointmentId }) {
    try {
      return await appointmentRepository.update({
        params,
        appointmentId,
      })
    } catch (error) {
      throw error
    }
  }
}

export default updateAppointmentFactory
