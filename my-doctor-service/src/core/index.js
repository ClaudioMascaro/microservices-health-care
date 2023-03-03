import modules from '../modules/index'

const { postgresDatabase } = modules

import doctorRepositoryFactory from './repositories/doctorRepository'
import affiliateDoctorFactory from './use-cases/affiliateDoctor'

const doctorRepository = doctorRepositoryFactory({ postgresDatabase })

const affiliateDoctor = affiliateDoctorFactory({ doctorRepository })

export default {
  affiliateDoctor,
}
