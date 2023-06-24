import { Router } from 'express'
import doctorsRouterFactory from './doctors.js'

export default function routesFactory ({ controllers, services }) {
  const router = Router()

  const { affiliateController } = controllers
  const { appointmentService } = services

  const doctorsRouter = doctorsRouterFactory({ Router, affiliateController, appointmentService })

  router.use('/', [
    doctorsRouter
  ])

  return router
}
