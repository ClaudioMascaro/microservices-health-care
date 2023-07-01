import BaseError from './BaseError.js'
import ErrorCodes from './ErrorCodes.js'

const { INTERNAL } = ErrorCodes

class InternalError extends BaseError {
  static fromError (error) {
    return Object.assign(
      new InternalError('Internal error'),
      {
        message: error.message,
        stack: error.stack,
        originalError: error,
      },
    )
  }

  constructor (message) {
    super({
      message,
      errorCode: INTERNAL,
    })
  }
}

export default InternalError
