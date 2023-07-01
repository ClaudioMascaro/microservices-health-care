import UserNotFound from '../../../errors/User/UserNotFound.js'

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
        error: JSON.stringify(new UserNotFound('User not found')),
      })
    }

    return callback(null, {
      payload: JSON.stringify({
        ...user,
      }),
    })
  }
}
