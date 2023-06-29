const {
  DYNAMO_PORT,
  DYNAMO_ENDPOINT,
  DYNAMO_AWS_ACCESS_KEY_ID,
  DYNAMO_AWS_SECRET_ACCESS_KEY,
  DYNAMO_AWS_REGION,
  DYNAMO_TIMEOUT,
  DYNAMO_MAX_RETRIES,
  DYNAMO_CONNECT_TIMEOUT,
} = process.env

const dynamo = {
  port: DYNAMO_PORT,
  endpoint: DYNAMO_ENDPOINT,
  aws_access_key_id: DYNAMO_AWS_ACCESS_KEY_ID,
  aws_secret_access_key: DYNAMO_AWS_SECRET_ACCESS_KEY,
  aws_region: DYNAMO_AWS_REGION,
  timeout:DYNAMO_TIMEOUT,
  maxRetries: DYNAMO_MAX_RETRIES,
  connectTimeout: DYNAMO_CONNECT_TIMEOUT,
}

export default dynamo
