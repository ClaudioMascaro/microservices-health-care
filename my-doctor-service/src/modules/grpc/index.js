import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

const dirname = path.dirname(new URL(import.meta.url).pathname)

const PROTO_PATH = path.join(dirname, './protos/doctor.proto')

function grpcServerFactory ({ core, logger }) {
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })

  const proto = grpc.loadPackageDefinition(packageDefinition)

  const server = new grpc.Server()

  server.addService(proto.DoctorService.service, core)

  async function start () {
    server.bindAsync(
      '0.0.0.0:50052',
      grpc.ServerCredentials.createInsecure(),
      () => {
        server.start()
      },
    )

    logger.info({
      message: 'gRPC server started',
    })
  }

  async function stop () {
    server.forceShutdown()

    logger.info({
      message: 'gRPC server stopped',
    })
  }

  return {
    start,
    stop,
  }
}

export default grpcServerFactory
