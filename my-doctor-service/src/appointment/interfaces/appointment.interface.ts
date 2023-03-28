export interface AvailableAppointment {
  doctorId?: string
  doctorData?: string
  userId?: string
  userData?: string
  startTime?: string
  appointmentTime?: string
  companyId?: string
  id?: number
  payload?: string
  appointments?: Array<AvailableAppointment>
}
