const {
  USER_SERVICE_HOST,
  USER_SERVICE_PORT,
} = process.env

const userService = {
  host: USER_SERVICE_HOST,
  port: USER_SERVICE_PORT,
}

export default userService
