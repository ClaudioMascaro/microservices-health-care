import { ClientOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'appointment',
    protoPath: join(__dirname, '../appointment/appointment.proto'),
  },
}
