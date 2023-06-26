import doctorControllerFactory from './doctors.js'

export default function controllersFactory ({ core, services }) {
  const { affiliateDoctor } = core

  const { appointmentService } = services

  const doctorController = doctorControllerFactory({ affiliateDoctor, appointmentService })

  return {
    doctorController,
  }
}
