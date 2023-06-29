import dynamoose from 'dynamoose'

import rawModels from './models/index.js'

export default function dynamoDbFactory ({ config, logger }) {
  const storage = {}

  const defineModel = (model) => {
    storage[model.modelName] = model.setupModel({ logger })
  }

  const setup = () => {
    try {
      if (!config.isProd) {
        dynamoose.aws.sdk.config.update({
          accessKeyId: config.dynamo.aws_access_key_id,
          region: config.dynamo.aws_region,
          secretAccessKey: config.dynamo.aws_secret_access_key,
        })

        dynamoose.aws.ddb.local(`${config.dynamo.endpoint}:${config.dynamo.port}`)
      }

      dynamoose.aws.sdk.config.update({
        httpOptions: {
          timeout: Number(config.dynamo.timeout),
          connectTimeout: Number(config.dynamo.connectTimeout),
        },
        maxRetries: Number(config.dynamo.maxRetries),
      })

      Object.values(rawModels)
        .forEach(defineModel)

      return storage
    } catch (error) {
      logger.error({
        description: 'Dynamo setup error',
        error: error.message,
        stack: error.stack.split('\n'),
      })

      throw error
    }
  }

  setup()

  return {
    storage,
    setup,
  }
}
