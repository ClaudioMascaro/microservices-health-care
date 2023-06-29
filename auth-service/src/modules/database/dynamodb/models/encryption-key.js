import dynamoose from 'dynamoose'

const modelName = 'encryptionKeys'

const encryptionKeySchema = new dynamoose.Schema({
  userId: {
    type: String,
    required: true,
    hashKey: true,
  },
  encryptionKey: {
    type: String,
    required: true,
  },
})

function setupModel ({ logger }) {
  const tableName = 'encryptionKeys'

  const modelConfig = {
    throughput: 'ON_DEMAND',
  }

  const Model = dynamoose.model(tableName, encryptionKeySchema, modelConfig)

  const findOne = async ({ userId }) => {
    try {
      const encryptionKey = await Model.query({
        userId: {
          eq: String(userId),
        },
      })
        .limit(1)
        .exec()

      return encryptionKey[0]
    } catch (error) {
      logger.error({
        description: 'Failed to retrieve item from dynamodb',
        userId,
        error: error.message,
        stack: error.stack.split('\n'),
      })

      throw error
    }
  }

  const create = async ({ userId, encryptionKey }) => {
    try {
      return new Model({
        userId: String(userId),
        encryptionKey: String(encryptionKey),
      }).save({ overwrite: false })
    } catch (error) {
      logger.error({
        description: 'Failed to create dynamo item',
        userId,
        error: error.message,
        stack: error.stack.split('\n'),
      })

      throw error
    }
  }

  const remove = async (userId) => {
    try {
      return Model.delete({
        userId: String(userId),
      })
    } catch (error) {
      logger.error({
        description: 'Failed to remove dynamo item',
        userId,
        error: error.message,
        stack: error.stack.split('\n'),
      })

      throw error
    }
  }

  return {
    findOne,
    create,
    remove,
  }
}

export default {
  modelName,
  setupModel,
}
