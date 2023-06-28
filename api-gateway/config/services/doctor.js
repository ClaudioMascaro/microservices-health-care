const {
  DOCTOR_SERVICE_HOST,
  DOCTOR_SERVICE_PORT,
} = process.env

const doctorService = {
  host: DOCTOR_SERVICE_HOST,
  port: DOCTOR_SERVICE_PORT,
}

export default doctorService
