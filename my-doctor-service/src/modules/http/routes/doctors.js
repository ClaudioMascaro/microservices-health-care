import wrapAction from '../wrapAction.js'

function doctorsRouterFactory ({ Router, doctorController }) {
  const doctorsRouter = Router()

  doctorsRouter.post(
    '/doctors',
    wrapAction(doctorController.affiliate),
  )

  doctorsRouter.post(
    '/doctors/:id/appointments',
    wrapAction(doctorController.createAppointment),
  )

  doctorsRouter.get(
    '/doctors/:id/appointments',
    wrapAction(doctorController.findAllAppointments),
  )

  return doctorsRouter
}

export default doctorsRouterFactory
