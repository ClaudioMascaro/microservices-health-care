import modules from '../modules/index.js'
import doctorRepositoryFactory from './repositories/doctorRepository.js'
import affiliateDoctorFactory from './use-cases/affiliateDoctor.js'

const { postgresDatabase } = modules

const doctorRepository = doctorRepositoryFactory({ postgresDatabase })

const affiliateDoctor = affiliateDoctorFactory({ doctorRepository })

export default {
  affiliateDoctor,
}
