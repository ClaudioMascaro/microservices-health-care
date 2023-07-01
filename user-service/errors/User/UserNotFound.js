import BaseError from '../BaseError.js'
import ErrorCodes from '../ErrorCodes.js'

const { RESOURCE_NOT_FOUND } = ErrorCodes

export default class UserNotFound extends BaseError {
  static fromError (error) {
    return Object.assign(
      new UserNotFound('User not found error'),
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
      errorCode: RESOURCE_NOT_FOUND,
    })
  }
}
