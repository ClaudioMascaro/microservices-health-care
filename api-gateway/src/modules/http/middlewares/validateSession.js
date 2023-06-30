// this middleware should validate auth bearer token
// and set req.user to the user object

export default function validateSessionFactory ({ AuthenticationService }) {
  return async function execute (req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    const token = authorization.split(' ')[1]

    const { payload = null, error = null } = await AuthenticationService.validateSession({
      payload: JSON.stringify({ sessionId: token }),
    })

    if (error) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }

    const { userId } = JSON.parse(payload)

    req.user = {
      id: userId,
    }

    return next()
  }
}
