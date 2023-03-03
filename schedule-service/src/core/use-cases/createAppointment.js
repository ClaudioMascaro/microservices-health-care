function createAppointmentFactory({ appointmentRepository }) {
  return async function execute({
    companyId,
    doctorId,
    doctorData,
    userId,
    userData,
    startTime,
    appointmentTime,
  }) {
    try {
      return await appointmentRepository.create({
        params: {
          company_id: companyId,
          doctor_id: doctorId,
          doctor_data: doctorData,
          user_id: userId,
          user_data: userData,
          start_time: startTime,
          appointment_time: appointmentTime,
        },
      })
    } catch (error) {
      throw error
    }
  }
}

export default createAppointmentFactory
