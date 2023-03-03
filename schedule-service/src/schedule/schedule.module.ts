import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { grpcClientOptions } from '../grpc-client.options'
import { ScheduleController } from './schedule.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHEDULE_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
