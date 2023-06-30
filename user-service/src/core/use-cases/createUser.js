export default function createUserFactory ({ userRepository, KeyService, encrypter }) {
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

      const encryptionKey = encrypter.generateEncryptionKey()
      const encryptedPassword = await encrypter.encrypt({ password, encryptionKey })

      const createdUser = await userRepository.create({
        userName,
        email,
        password: encryptedPassword,
      })

      await KeyService.createKey({
        payload: JSON.stringify({
          userId: createdUser.id,
          encryptionKey,
        }),
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
