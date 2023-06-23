import { Router } from 'express'
import doctorsRouterFactory from './doctors.js'

export default function routesFactory ({ controllers }) {
  const router = Router()

  const { affiliateController } = controllers

  const doctorsRouter = doctorsRouterFactory({ affiliateController })

  router.use('/', [
    doctorsRouter
  ])

  return router
}
