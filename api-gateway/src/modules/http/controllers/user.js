export default function userControllerFactory ({ AuthenticationService }) {
  async function create ({ body }) {
    const {
      payload = null,
      error = null,
    } = await AuthenticationService.createUser({
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
        statusCode: 401,
      }
    }

    const {
      payload: sessionPayload = null,
      error: sessionError = null,
    } = await AuthenticationService.createSession({
      payload,
    })

    if (sessionError) {
      return {
        body: JSON.parse(sessionError),
        statusCode: 401,
      }
    }

    return {
      body: JSON.parse(sessionPayload),
      statusCode: 200,
    }
  }

  return {
    create,
    authenticate,
  }
}
