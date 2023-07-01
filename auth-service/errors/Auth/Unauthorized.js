import BaseError from '../BaseError.js'
import ErrorCodes from '../ErrorCodes.js'

const { AUTHORIZATION } = ErrorCodes

export default class Unauthorized extends BaseError {
  static fromError (error) {
    return Object.assign(
      new Unauthorized('Unauthorized error'),
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
      errorCode: AUTHORIZATION,
    })
  }
}
