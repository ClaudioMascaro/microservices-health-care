export default function userControllerFactory ({ UserService, AuthenticationService }) {
  async function create ({ body }) {
    const {
      payload = null,
      error = null,
    } = await UserService.createUser({
      payload: JSON.stringify(body),
    })

    if (error) {
      return {
        body: JSON.parse(error),
        statusCode: 400,
      }
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
      return {
        body: JSON.parse(error),
        statusCode: 400,
      }
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
