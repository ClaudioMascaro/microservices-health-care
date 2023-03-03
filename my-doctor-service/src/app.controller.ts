import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appointmentService: AppService,
  ) {}

  @Post('/doctors')
  create(@Body() body: any): Promise<any> {
    return this.appService.affiliateDoctor({ params: body })
  }

  @Get('/doctors/:id/appointments/available')
  findDoctorAvailableAppointments(
    @Param('id') id: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): any {
    return this.appointmentService
      .findAvailableAppointments({
        doctorId: id,
        startDate,
        endDate,
      })
      .pipe()
  }

  @Post('/doctors/:id/appointments')
  createAppointment(
    @Param('id') id: number,
    @Body('data') data: object,
  ): Promise<any> {
    return this.appointmentService.createAppointment({
      doctorId: id,
      data,
    })
  }
}
