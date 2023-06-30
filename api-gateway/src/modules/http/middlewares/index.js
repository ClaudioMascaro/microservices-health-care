import validateSessionFactory from './validateSession.js'

export default function middlewaresFactory ({ services }) {
  const {
    AuthenticationService,
  } = services

  const validateSession = validateSessionFactory({ AuthenticationService })

  return {
    validateSession,
  }
}
