import { Module } from '@nestjs/common'
import { ScheduleModule } from './schedule/schedule.module'

@Module({
  imports: [ScheduleModule],
})
export class AppModule {}
