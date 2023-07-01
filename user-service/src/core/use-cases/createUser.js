export default function createUserFactory ({
  userRepository,
  encrypter,
}) {
  return async function execute ({ request }, callback) {
    try {
      const {
        payload,
      } = request

      const {
        userName,
        email,
        password,
      } = JSON.parse(payload)

      const salt = encrypter.generateRandomKey()
      const encryptedPassword = await encrypter.encrypt({ password, salt })

      const createdUser = await userRepository.create({
        userName,
        email,
        passwordHash: encryptedPassword,
        passwordSalt: salt,
      })

      return callback(null, {
        payload: JSON.stringify({
          id: createdUser.id,
          userName: createdUser.userName,
          email: createdUser.email,
          createdAt: createdUser.createdAt,
          updatedAt: createdUser.updatedAt,
        }),
      })
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return callback(null, {
          error: JSON.stringify({
            message: 'User or email already exists',
          }),
        })
      }

      return callback(null, {
        error: JSON.stringify({
          message: 'Internal server error',
        }),
      })
    }
  }
}
