import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import { promisify } from 'util'

const dirname = path.dirname(new URL(import.meta.url).pathname)

function loadService ({
  serviceName,
  fileName,
  address,
  credentials = grpc.credentials.createInsecure(),
}) {
  const protoConfig = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }

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

export default loadService
