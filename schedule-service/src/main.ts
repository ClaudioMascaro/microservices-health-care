import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { grpcClientOptions } from './grpc-client.options'

import modules from './modules/index'

const { postgresDatabase } = modules

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await postgresDatabase.start()
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)

  await app.startAllMicroservices()
  await app.listen(3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
