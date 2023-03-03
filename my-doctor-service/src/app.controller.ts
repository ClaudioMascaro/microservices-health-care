import { Controller, Post, Body, Param, Get } from '@nestjs/common'
import { Observable, toArray } from 'rxjs'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly scheduleService: AppService,
  ) {}

  @Post('/doctors')
  create(@Body() body: any): Promise<any> {
    return this.appService.affiliateDoctor({ params: body })
  }

  @Get('/doctors/:id/schedules/next_available')
  getNextAvailableDoctorSchedule(@Param('id') id: number): Observable<any> {
    return this.scheduleService.findNextAvailableSchedule({ doctorId: id })
  }

  @Get('/doctors/:id/schedules')
  call(@Param('id') id: number): Observable<any> {
    const scheduleStream = this.scheduleService.findAllAvailableSchedule({
      doctorId: id,
    })

    return scheduleStream.pipe(toArray())
  }
}
