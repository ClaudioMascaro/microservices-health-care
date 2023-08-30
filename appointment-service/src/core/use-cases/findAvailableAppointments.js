function findAvailableAppointmentsFactory ({ appointmentRepository, DoctorService }) {
  const getAvailableTimes = (weekSchedule, startDate, endDate) => {
    const availableTimes = []

    const currentDate = new Date(startDate)

    const dayOfWeek = {
      sun: 7,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    }

    while (currentDate <= new Date(endDate)) {
      const day = currentDate.getDay()
      const daySchedule = weekSchedule[Object.keys(dayOfWeek)[day]]

      if (daySchedule && daySchedule.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const { start, end, interval } of daySchedule) {
          const [startHour, startMinute] = start.split('h')
          const [endHour, endMinute] = end.split('h')
          const [intervalValue, intervalUnit] = interval.split(/(?<=\d)(?=[a-z])/i)

          const startDateTime = new Date(currentDate
            .getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinute)
          const endDateTime = new Date(currentDate

            .getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinute)

          const currentDateTime = new Date(startDateTime.getTime())

          while (currentDateTime < endDateTime) {
            const startTime = new Date(currentDateTime.getTime()).toISOString()
            const intervalMinutes = parseInt(intervalValue, 10) * (intervalUnit === 'h' ? 60 : 1)
            currentDateTime.setMinutes(currentDateTime.getMinutes() + intervalMinutes)

            availableTimes.push({ startTime })
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return availableTimes
  }

  return async function execute ({ request }, callback) {
    try {
      const { params } = request

      const { doctorId, startDate = false, endDate = false } = JSON.parse(params)

      const {
        payload: doctorPayload,
        error,
      } = await DoctorService.getDoctor({
        id: doctorId,
      })

      if (error) {
        return callback(null, {
          error,
        })
      }

      const { week_schedule: weekSchedule } = JSON.parse(doctorPayload)

      const appointments = await appointmentRepository.listByDoctorId({
        queryParams: {
          doctorId: Number(doctorId),
          startDate,
          endDate,
        },
      })

      const availableTimes = getAvailableTimes(
        weekSchedule,
        Number(startDate),
        Number(endDate),
      )

      return callback(null, {
        appointments: appointments.map((appointment) => ({
          id: appointment.id,
          payload: JSON.stringify(appointment),
        })),
      })
    } catch (error) {
      throw new Error('todo')
    }
  }
}

export default findAvailableAppointmentsFactory
