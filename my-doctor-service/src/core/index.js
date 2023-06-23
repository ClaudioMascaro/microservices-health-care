import doctorRepositoryFactory from './repositories/doctorRepository.js'
import affiliateDoctorFactory from './use-cases/affiliateDoctor.js'

export default function core ({ modules }) {
  const { postgresDatabase } = modules

  const doctorRepository = doctorRepositoryFactory({ postgresDatabase })

  const affiliateDoctor = affiliateDoctorFactory({ doctorRepository })

  return {
    affiliateDoctor,
  }
}
