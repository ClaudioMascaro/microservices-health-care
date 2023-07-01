import BaseError from '../BaseError.js'
import ErrorCodes from '../ErrorCodes.js'

const { RESOURCE_CONFLICT } = ErrorCodes

export default class UserAlreadyExists extends BaseError {
  static fromError (error) {
    return Object.assign(
      new UserAlreadyExists('User already exists error'),
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
      errorCode: RESOURCE_CONFLICT,
    })
  }
}
