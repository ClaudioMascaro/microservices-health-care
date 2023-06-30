/* eslint-disable max-classes-per-file */
class UserNotFound extends Error {
  constructor (...args) {
    super(...args)
    this.message = 'User not found'
    Error.captureStackTrace(this, UserNotFound)
  }
}

class InvalidPassword extends Error {
  constructor (...args) {
    super(...args)
    this.message = 'Invalid password'
    Error.captureStackTrace(this, InvalidPassword)
  }
}

export default function authenticateUserFactory ({
  UserService,
  KeyService,
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
      payload: userPayload,
    } = await UserService.findUser({
      payload: JSON.stringify({ userName }),
    })

    const user = JSON.parse(userPayload)

    if (!user) {
      return callback(null, {
        error: JSON.stringify(new UserNotFound()),
      })
    }

    const {
      id: userId,
      password: encryptedPassword,
    } = user

    const { payload: keyPayload } = await KeyService.findKey({
      payload: JSON.stringify({ userId }),
    })

    const { encryptionKey } = JSON.parse(keyPayload)

    const decryptedPassword = encrypter.decrypt({
      encryptedText: encryptedPassword,
      encryptionKey,
    })

    if (decryptedPassword !== password) {
      return callback(null, {
        error: JSON.stringify(new InvalidPassword()),
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
