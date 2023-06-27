import express, { json } from 'express'
import responseTime from 'response-time'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'

function httpServerFactory ({
  logger,
  httpLogger,
  config,
  routes,
}) {
  let httpConnection
  const server = express()
  server.use(responseTime())
  server.use(json())
  server.use(httpLogger)
  server.use(compression())
  server.use(cors())
  server.use(helmet())
  server.use(routes)

  const { port } = config.http.server

  function start () {
    httpConnection = server.listen(port, () => {
      logger.info({
        message: 'Http server started',
        port,
      })
    })
  }

  function stop () {
    httpConnection?.close(() => {
      logger.info({
        message: 'Http server stopped',
        port,
      })
    })
  }

  return {
    start,
    stop,
  }
}

export default httpServerFactory
