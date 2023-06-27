import { Router } from 'express'
import wrapAction from '../wrapAction.js'

export default function routerFactory ({ controllers }) {
  const router = Router()

  const { doctorController, appointmentController } = controllers

  router.post(
    '/doctors',
    wrapAction(doctorController.affiliate),
  )

  router.post(
    '/doctors/:id/appointments',
    wrapAction(appointmentController.create),
  )

  router.get(
    '/doctors/:id/appointments',
    wrapAction(appointmentController.list),
  )

  return router
}