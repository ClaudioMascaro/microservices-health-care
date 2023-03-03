import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { grpcClientOptions } from './grpc-client.options'
import { AppService } from './app.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHEDULE_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
