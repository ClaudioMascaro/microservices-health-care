import InvalidSession from '../../../errors/Auth/InvalidSession.js'

export default function validateSessionFactory ({ sessionRepository, config }) {
  return async function execute ({ request }, callback) {
    try {
      const validateSession = async (session) => {
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
          await sessionRepository.deleteBySessionId({
            sessionId: session.id,
          })
          return null
        }

        return session
      }

      const {
        payload,
      } = request

      const {
        sessionId = null,
      } = JSON.parse(payload)

      const session = await sessionRepository.findBySessionId({
        sessionId,
      })

      const validatedSession = await validateSession(session)

      if (!validatedSession) {
        return callback(null, {
          error: JSON.stringify(new InvalidSession('Invalid session')),
        })
      }

      return callback(null, {
        payload: JSON.stringify(validatedSession),
      })
    } catch (error) {
      return callback(null, {
        error: JSON.stringify(error),
      })
    }
  }
}
