export default class BaseError extends Error {
  constructor ({
    message,
    errorCode,
    originalError,
  }) {
    super(message)

    this.body = {
      message,
      errorCode,
    }

    this.originalError = originalError
  }

  getBody () {
    return this.body
  }
}
