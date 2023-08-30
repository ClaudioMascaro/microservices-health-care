import modules from '../modules/index.js'
import doctorRepositoryFactory from './repositories/doctorRepository.js'
import affiliateDoctorFactory from './use-cases/affiliateDoctor.js'
import getDoctorFactory from './use-cases/getDoctor.js'

const { postgresDatabase } = modules

const doctorRepository = doctorRepositoryFactory({ postgresDatabase })

const affiliateDoctor = affiliateDoctorFactory({ doctorRepository })
const getDoctor = getDoctorFactory({ doctorRepository })

export default {
  affiliateDoctor,
  getDoctor,
}
