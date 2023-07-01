import BaseError from '../BaseError.js'
import ErrorCodes from '../ErrorCodes.js'

const { AUTHENTICATION } = ErrorCodes

export default class InvalidSession extends BaseError {
  static fromError (error) {
    return Object.assign(
      new InvalidSession('Invalid session error'),
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
      errorCode: AUTHENTICATION,
    })
  }
}
