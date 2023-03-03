import { Injectable, OnModuleInit } from '@nestjs/common'
import {
  Client,
  ClientGrpc,
  GrpcMethod,
  GrpcStreamCall,
  Transport,
} from '@nestjs/microservices'
import { join } from 'path'
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs'

import core from './core/index'
import { AvailableSchedule } from './schedule/interfaces/schedule.interface'
import { ScheduleByDoctorId } from './schedule/interfaces/scheduleByDoctorId.interface'

const { affiliateDoctor } = core

interface ScheduleService {
  findNextAvailableSchedule(
    data: ScheduleByDoctorId,
  ): Observable<AvailableSchedule>
  findAllAvailableSchedule(
    upstream: Observable<ScheduleByDoctorId>,
  ): Observable<AvailableSchedule>
}

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'schedule',
      protoPath: join(__dirname, '../schedule/schedule.proto'),
    },
  })
  client: ClientGrpc

  public scheduleService: ScheduleService

  onModuleInit() {
    this.scheduleService =
      this.client.getService<ScheduleService>('ScheduleService')
  }

  findNextAvailableSchedule({ doctorId }): Observable<AvailableSchedule> {
    return this.scheduleService.findNextAvailableSchedule({ doctorId })
  }

  @GrpcStreamCall()
  findAllAvailableSchedule({ doctorId }): Observable<AvailableSchedule> {
    const scheduleRequest$ = new ReplaySubject<ScheduleByDoctorId>()

    scheduleRequest$.next({ doctorId })
    scheduleRequest$.complete()

    return this.scheduleService.findAllAvailableSchedule(
      scheduleRequest$.asObservable(),
    )
  }

  affiliateDoctor({ params }): Promise<any> {
    return affiliateDoctor({ params })
  }
}
