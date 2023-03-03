import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { grpcClientOptions } from '../grpc-client.options'
import { AppointmentController } from './appointment.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APPOINTMENT_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
