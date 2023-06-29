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

export default function authenticateUserFactory ({ userRepository, keyRepository, encrypter }) {
  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      userName,
      password,
      keepSigned = false,
    } = JSON.parse(payload)

    const user = await userRepository.findByUserName({ userName })

    if (!user) {
      return callback(null, {
        error: JSON.stringify(new UserNotFound()),
      })
    }

    const {
      id: userId,
      password: encryptedPassword,
    } = user

    const { encryptionKey } = await keyRepository.find({ userId })

    const decryptedPassword = encrypter.decrypt({
      encryptedText: encryptedPassword,
      encryptionKey,
    })

    if (decryptedPassword !== password) {
      return callback(null, {
        error: JSON.stringify(new InvalidPassword()),
      })
    }

    return callback(null, {
      payload: JSON.stringify({
        keepSigned,
        userId,
      }),
    })
  }
}
