export default function userRepositoryFactory ({ dynamoDb }) {
  const EncryptionKeys = dynamoDb.storage.encryptionKeys

  async function create ({
    userId,
    encryptionKey,
  }) {
    try {
      return EncryptionKeys.create({ userId, encryptionKey })
    } catch (error) {
      throw new Error('todo')
    }
  }

  async function find ({
    userId,
  }) {
    return EncryptionKeys.findOne({ userId })
  }

  return {
    create,
    find,
  }
}
