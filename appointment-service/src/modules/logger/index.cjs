const log4js = require('log4js')

const { configure, getLogger, addLayout } = log4js
const escriba = require('escriba')

const loggerFactory = ({ config }) => {
  const logType = 'console'

  const log4jsConfig = {
    appenders: {
      [logType]: {
        layout: { type: 'json' },
        type: 'stdout',
      },
    },
    categories: {
      default: {
        appenders: [logType],
        level: 'info',
      },
    },
  }

  const jsonLayout = () => (logEvent) => logEvent.data.join('\n')

  addLayout('json', jsonLayout)
  configure(log4jsConfig)

  const loggerEngine = getLogger(config.app.name)

  const escribaConfig = {
    loggerEngine,
    service: config.app.name,
    httpConf: {
      propsToLog: {
        request: [
          'id',
          'method',
          'headers.companyid',
          'url',
          'body',
          'headers.X-Forwarded-For',
          'headers.x-referrer-by',
          'httpVersion',
          'referrer',
          'referer',
          'user-agent',
        ],
        response: [
          'id',
          'method',
          'headers.companyid',
          'url',
          'statusCode',
          'body',
          'httpVersion',
          'referrer',
          'referer',
          'user-agent',
          'latency',
          'route.path',
          'headers.X-Forwarded-For',
          'headers.x-referrer-by',
        ],
      },
      skipRules: [
        {
          route: /\/status/,
          method: /.*/,
          onlyBody: false,
        },
        {
          route: /.*/,
          method: /OPTIONS/,
          onlyBody: false,
        },
      ],
      propMaxLength: {
        body: 4096,
        url: 2048,
      },
      propsToParse: {
        request: {
          'body.id': String,
        },
        response: {
          'body.id': String,
          'body.errors': JSON.stringify,
        },
      },
    },
  }

  const { logger } = escriba(escribaConfig)

  const getEnvironmentShortname = (env) => {
    const values = {
      production: 'prd',
      sandbox: 'sdx',
      staging: 'stg',
      development: 'dev',
    }

    return values[env]
  }

  const environmentShortname = getEnvironmentShortname(config.env)

  const extraFields = {
    hostname: `${config.app.name}-${environmentShortname}`,
    dd: {
      service: config.app.name,
      env: config.env,
      version: config.app.version,
    },
  }

  const mergeFields = (fields) => ({
    ...fields,
    ...extraFields,
  })

  return {
    trace: (message, fields) => logger.trace(message, mergeFields(fields)),
    debug: (message, fields) => logger.debug(message, mergeFields(fields)),
    info: (message, fields) => logger.info(message, mergeFields(fields)),
    warn: (message, fields) => logger.warn(message, mergeFields(fields)),
    error: (message, fields) => logger.error(message, mergeFields(fields)),
    fatal: (message, fields) => logger.fatal(message, mergeFields(fields)),
  }
}

module.exports = loggerFactory
