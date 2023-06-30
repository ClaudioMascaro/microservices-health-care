/* eslint-disable max-classes-per-file */
class UserNotFound extends Error {
  constructor (...args) {
    super(...args)
    this.message = 'User not found'
    Error.captureStackTrace(this, UserNotFound)
  }
}

export default function findUserFactory ({ userRepository }) {
  return async function execute ({ request }, callback) {
    const {
      payload,
    } = request

    const {
      userName,
    } = JSON.parse(payload)

    const user = await userRepository.findByUserName({ userName })

    if (!user) {
      return callback(null, {
        error: JSON.stringify(new UserNotFound()),
      })
    }

    return callback(null, {
      payload: JSON.stringify({
        ...user,
      }),
    })
  }
}
