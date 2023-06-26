import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

const dirname = path.dirname(new URL(import.meta.url).pathname)

const PROTO_PATH = path.join(dirname, './protos/appointment.proto')

export default function grpcClientFactory ({ logger }) {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })

  const appointmentProto = grpc.loadPackageDefinition(packageDefinition).appointment

  const client = new appointmentProto.AppointmentService('localhost:50051', grpc.credentials.createInsecure())

  async function createAppointment (appointment) {
    return new Promise((resolve, reject) => {
      client.CreateAppointment(appointment, (error, response) => {
        if (error) {
          logger.error({
            message: 'Unexpected error creating appointment',
            error: error.message,
            stack: error.stack?.split('\n'),
          })
          reject(error)
        }

        resolve({ id: response.id, payload: JSON.parse(response.payload) })
      })
    })
  }

  async function findAllAppointments (params) {
    return new Promise((resolve, reject) => {
      client.FindAllAppointments(params, (error, { appointments }) => {
        if (error) {
          logger.error({
            message: 'Unexpected error finding appointments',
            error: error.message,
            stack: error.stack?.split('\n'),
          })
          reject(error)
        }

        resolve(appointments.map(({ id, payload }) => ({ id, payload: JSON.parse(payload) })))
      })
    })
  }

  return {
    createAppointment,
    findAllAppointments,
  }
}
