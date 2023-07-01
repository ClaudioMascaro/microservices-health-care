export default function userControllerFactory ({
  UserService,
  AuthenticationService,
  errorHandler,
}) {
  async function create ({ body }) {
    const {
      payload = null,
      error = null,
    } = await UserService.createUser({
      payload: JSON.stringify(body),
    })

    if (error) {
      return errorHandler(error)
    }

    return {
      body: JSON.parse(payload),
      statusCode: 201,
    }
  }

  async function authenticate ({ body }) {
    const {
      payload = null,
      error = null,
    } = await AuthenticationService.authenticateUser({
      payload: JSON.stringify(body),
    })

    if (error) {
      return errorHandler(error)
    }

    return {
      body: JSON.parse(payload),
      statusCode: 200,
    }
  }

  return {
    create,
    authenticate,
  }
}
