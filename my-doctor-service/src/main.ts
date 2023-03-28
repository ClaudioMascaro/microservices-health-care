import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import modules from './modules/index'

const { postgresDatabase, logger } = modules
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  })
  logger.info({ message: 'Starting application' })
  await postgresDatabase.start()
  await app.listen(3000)

  logger.info({ message: 'Server running on port 3000' })
}
bootstrap()
