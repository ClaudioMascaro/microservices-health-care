import { Router } from 'express'
import wrapAction from '../wrapAction.js'

function doctorsRouterFactory ({ affiliateController }) {
  const doctorsRouter = Router()

  doctorsRouter.post(
    '/doctors',
    wrapAction(affiliateController.affiliate),
  )

  return doctorsRouter
}


export default doctorsRouterFactory
