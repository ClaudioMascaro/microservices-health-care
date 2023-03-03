import { Controller, Inject, OnModuleInit } from '@nestjs/common'
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import { Observable, Subject } from 'rxjs'
import { ScheduleByDoctorId } from './interfaces/scheduleByDoctorId.interface'
import { AvailableSchedule } from './interfaces/schedule.interface'

function filterEarliestSchedule({ doctorId, items }) {
  const filteredSchedule = items.filter(
    (appointment) => appointment.doctorId === doctorId,
  )
  if (filteredSchedule.length === 0) {
    return null
  }
  const earliestAppointment = filteredSchedule.reduce((earliest, current) => {
    const earliestDate = new Date(earliest.date + 'T' + earliest.startTime)
    const currentDate = new Date(current.date + 'T' + current.startTime)
    return currentDate < earliestDate ? current : earliest
  })
  return earliestAppointment
}

interface ScheduleService {
  findNextAvailableSchedule(
    data: ScheduleByDoctorId,
  ): Observable<AvailableSchedule>
  findAllAvailableSchedule(
    upstream: Observable<ScheduleByDoctorId>,
  ): Observable<AvailableSchedule>
}

@Controller('schedule')
export class ScheduleController implements OnModuleInit {
  private readonly items: AvailableSchedule[] = [
    { doctorId: 1, startTime: '17:00', date: '2023-05-12' },
    { doctorId: 1, startTime: '09:00', date: '2023-05-13' },
    { doctorId: 1, startTime: '10:00', date: '2023-05-13' },
    { doctorId: 1, startTime: '11:00', date: '2023-05-13' },
    { doctorId: 1, startTime: '14:00', date: '2023-05-13' },
    { doctorId: 2, startTime: '16:00', date: '2023-05-29' },
    { doctorId: 2, startTime: '09:00', date: '2023-05-30' },
    { doctorId: 2, startTime: '10:00', date: '2023-05-30' },
    { doctorId: 2, startTime: '11:00', date: '2023-05-30' },
    { doctorId: 2, startTime: '14:00', date: '2023-05-30' },
    { doctorId: 3, startTime: '15:00', date: '2023-06-28' },
    { doctorId: 3, startTime: '09:00', date: '2023-06-29' },
    { doctorId: 3, startTime: '10:00', date: '2023-06-29' },
    { doctorId: 3, startTime: '11:00', date: '2023-06-29' },
    { doctorId: 3, startTime: '14:00', date: '2023-06-29' },
  ]

  constructor(
    @Inject('SCHEDULE_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  private scheduleService: ScheduleService

  onModuleInit() {
    this.scheduleService =
      this.client.getService<ScheduleService>('ScheduleService')
  }

  @GrpcMethod('ScheduleService', 'FindNextAvailableSchedule')
  findNextAvailableSchedule(data: ScheduleByDoctorId): AvailableSchedule {
    return filterEarliestSchedule({
      doctorId: data.doctorId,
      items: this.items,
    })
  }

  @GrpcStreamMethod('ScheduleService', 'FindAllAvailableSchedule')
  findAllAvailableSchedule(
    data$: Observable<ScheduleByDoctorId>,
  ): Observable<AvailableSchedule> {
    const schedule$ = new Subject<AvailableSchedule>()

    const onNext = (scheduleByDoctorId: ScheduleByDoctorId) => {
      const item = this.items.find(
        ({ doctorId }) => doctorId === scheduleByDoctorId.doctorId,
      )
      schedule$.next(item)
    }
    const onComplete = () => schedule$.complete()
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    })

    return schedule$.asObservable()
  }
}
