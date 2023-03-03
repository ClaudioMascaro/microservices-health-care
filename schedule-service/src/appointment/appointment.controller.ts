import { Controller, Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import { AppointmentByDoctorId } from './interfaces/appointmentList.interface'
import { AvailableAppointment } from './interfaces/appointment.interface'

import core from '../core/index'
import { Observable, Subject } from 'rxjs'

const { createAppointment, findAvailableAppointments, updateAppointment } = core

interface AppointmentService {
  findAvailableAppointments(
    data: AppointmentByDoctorId,
  ): Observable<AvailableAppointment[]>
  createAppointment(
    data: AvailableAppointment,
  ): Observable<AvailableAppointment>
}

@Controller('appointment')
export class AppointmentController implements OnModuleInit {
  constructor(
    @Inject('APPOINTMENT_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private appointmentService: AppointmentService

  onModuleInit() {
    this.appointmentService =
      this.client.getService<AppointmentService>('AppointmentService')
  }

  @GrpcMethod('AppointmentService', 'FindAvailableAppointments')
  async findAvailableAppointments(
    data: AppointmentByDoctorId,
  ): Promise<object> {
    const { doctorId, startDate, endDate } = data

    const appointments = await findAvailableAppointments({
      doctorId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    })

    return { appointments }
  }

  @GrpcMethod('AppointmentService', 'CreateAppointment')
  async createAppointment(
    data: AvailableAppointment,
  ): Promise<AvailableAppointment> {
    const createdAppointment = await createAppointment(data)
    console.log(
      '🚀 ~ file: appointment.controller.ts:55 ~ AppointmentController ~ createdAppointment:',
      createdAppointment,
    )

    return createdAppointment.dataValues
  }
}
