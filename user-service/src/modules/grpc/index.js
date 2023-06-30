import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'

const dirname = path.dirname(new URL(import.meta.url).pathname)

const PROTO_PATH = path.join(dirname, './protos/user.proto')

const grpcServerFactory = ({ config }) => ({ core, logger }) => {
  const { grpc: grpcConfig } = config

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })

  const proto = grpc.loadPackageDefinition(packageDefinition)

  const server = new grpc.Server()

  server.addService(proto.UserService.service, core)

  async function start () {
    server.bindAsync(
      `0.0.0.0:${grpcConfig.port}`,
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
    loadService,
  }
}

function loadService ({
  serviceName,
  fileName,
  address,
  credentials = grpc.credentials.createInsecure(),
}) {
  const protoDef = protoLoader.loadSync(
    path.join(dirname, `./protos/${fileName}.proto`),
    protoConfig,
  )

  const proto = grpc.loadPackageDefinition(protoDef)

  const client = new proto[serviceName](address, credentials)

  Object.entries(client.__proto__).map(([prop, value]) => {
    if (value.originalName !== undefined) {
      client[prop] = promisify(value)
    }
  })

  return client
} 


export default grpcServerFactory
