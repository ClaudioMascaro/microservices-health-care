class SessionNotFound extends Error {
  constructor (...args) {
    super(...args)
    this.message = 'Session not found'
    Error.captureStackTrace(this, SessionNotFound)
  }
}

export default function validateSessionFactory ({ sessionRepository, config }) {
  const validateSession = (session) => {
    if (!session) {
      return null
    }

    if (session.keepSigned) {
      return session
    }

    const { duration: sessionDuration } = config.session

    const sessionExpired = new Date(session.createdAt)
      .getTime() + sessionDuration < new Date().getTime()

    if (sessionExpired) {
      return null
    }

    return session
  }

  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      sessionId,
    } = JSON.parse(payload)

    const session = await sessionRepository.findBySessionId({
      sessionId,
    })

    const validatedSession = validateSession(session)

    if (!validatedSession) {
      return callback(null, {
        error: JSON.stringify(new SessionNotFound()),
      })
    }

    return callback(null, {
      payload: JSON.stringify(validatedSession),
    })
  }
}
