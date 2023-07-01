import InvalidPassword from '../../../errors/Auth/InvalidPassword.js'

export default function authenticateUserFactory ({
  UserService,
  sessionRepository,
  encrypter,
}) {
  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      userName,
      password,
      keepSigned = false,
    } = JSON.parse(payload)

    const {
      payload: userPayload = null,
      error = null,
    } = await UserService.findUser({
      payload: JSON.stringify({ userName }),
    })

    if (error) {
      return callback(null, {
        error,
      })
    }

    const user = JSON.parse(userPayload)

    const {
      id: userId,
      passwordHash,
      passwordSalt,
    } = user

    const isPasswordValid = encrypter.compare({
      passwordHash,
      passwordSalt,
      password,
    })

    if (!isPasswordValid) {
      return callback(null, {
        error: JSON.stringify(new InvalidPassword('Invalid password error')),
      })
    }

    const createdSession = await sessionRepository.create({
      userId,
      keepSigned,
    })

    const { id } = createdSession

    return callback(null, {
      payload: JSON.stringify({ sessionId: id }),
    })
  }
}
