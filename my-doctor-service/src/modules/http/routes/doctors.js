import wrapAction from '../wrapAction.js'

function doctorsRouterFactory ({ Router, affiliateController, appointmentService }) {
  const doctorsRouter = Router()

  doctorsRouter.post(
    '/doctors',
    wrapAction(affiliateController.affiliate),
  )

  doctorsRouter.post(
    '/doctors/:id/appointments',
    wrapAction(appointmentService.createAppointment)
  )

  return doctorsRouter
}


export default doctorsRouterFactory
