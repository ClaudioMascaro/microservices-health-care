import ErrorCodes from './ErrorCodes.js'

const getStatusCode = (errorCode) => {
  let statusCodes = {}

  Object.values(ErrorCodes).forEach((code) => {
    const [,, ...statusCode] = code
    statusCodes = {
      ...statusCodes,
      [code]: statusCode.join(''),
    }
  })

  return statusCodes[errorCode]
}

export default function errorHandler (error) {
  const { body } = JSON.parse(error)
  const { message, errorCode } = body

  return {
    statusCode: getStatusCode(errorCode),
    body: {
      error: message,
    },
  }
}
