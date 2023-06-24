import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

const dirname = path.dirname(new URL(import.meta.url).pathname)

const PROTO_PATH = path.join(dirname , './protos/appointment.proto')

function grpcServerFactory({ core, logger }) {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })

  const { appointment } = grpc.loadPackageDefinition(packageDefinition)

  const server = new grpc.Server()

  server.addService(appointment.AppointmentService.service, { CreateAppointment: core.createAppointment })

  async function start() {
    server.bindAsync(
      '0.0.0.0:50051',
      grpc.ServerCredentials.createInsecure(),
      () => {
        server.start()
      }
    )

    logger.info({
      message: 'gRPC server started',
    })
  }

  async function stop() {
    server.forceShutdown()

    logger.info({
      message: 'gRPC server stopped',
    })
  }

  return {
    start,
    stop
  }
}

export default grpcServerFactory
