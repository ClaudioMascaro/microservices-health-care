const {
  APPOINTMENT_SERVICE_HOST,
  APPOINTMENT_SERVICE_PORT,
} = process.env

const appointmentService = {
  host: APPOINTMENT_SERVICE_HOST,
  port: APPOINTMENT_SERVICE_PORT,
}

export default appointmentService
