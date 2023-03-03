import { Injectable, OnModuleInit } from '@nestjs/common'
import {
  Client,
  ClientGrpc,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices'
import { join } from 'path'

import core from './core/index'
import { AvailableAppointment } from './appointment/interfaces/appointment.interface'
import { AppointmentByDoctorId } from './appointment/interfaces/appointmentList.interface'
import { Observable } from 'rxjs'

const { affiliateDoctor } = core

interface AppointmentService {
  findAvailableAppointments(
    data: AppointmentByDoctorId,
  ): Observable<AvailableAppointment[]>
  createAppointment(data: AvailableAppointment): Promise<AvailableAppointment>
}

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'appointment',
      protoPath: join(__dirname, '../appointment/appointment.proto'),
    },
  })
  client: ClientGrpc

  public appointmentService: AppointmentService

  onModuleInit() {
    this.appointmentService =
      this.client.getService<AppointmentService>('AppointmentService')
  }

  @GrpcMethod()
  findAvailableAppointments({
    doctorId,
    startDate,
    endDate,
  }): Observable<AvailableAppointment[]> {
    return this.appointmentService.findAvailableAppointments({
      doctorId,
      startDate,
      endDate,
    })
  }

  @GrpcMethod()
  async createAppointment({ doctorId, data }): Promise<AvailableAppointment> {
    const dataObject = {
      doctorId,
      ...data,
    }

    return await this.appointmentService.createAppointment(dataObject)
  }

  affiliateDoctor({ params }): Promise<any> {
    return affiliateDoctor({ params })
  }
}
