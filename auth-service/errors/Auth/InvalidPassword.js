import BaseError from '../BaseError.js'
import ErrorCodes from '../ErrorCodes.js'

const { AUTHENTICATION } = ErrorCodes

export default class InvalidPassword extends BaseError {
  static fromError (error) {
    return Object.assign(
      new InvalidPassword('Invalid password error'),
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
