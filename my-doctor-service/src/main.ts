import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import modules from './modules/index'

const { postgresDatabase } = modules
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await postgresDatabase.start()
  await app.listen(3000)
}
bootstrap()
