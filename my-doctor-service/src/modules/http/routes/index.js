import { Router } from 'express'
import doctorsRouterFactory from './doctors.js'

export default function routesFactory ({ controllers }) {
  const router = Router()

  const { doctorController } = controllers

  const doctorsRouter = doctorsRouterFactory({ Router, doctorController })

  router.use('/', [
    doctorsRouter
  ])

  return router
}
