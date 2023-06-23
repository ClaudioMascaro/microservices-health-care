const log4js = require('log4js')
const escriba = require('escriba')

const createLogger = ({ config }) => {
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

  log4js.addLayout('json', jsonLayout)
  log4js.configure(log4jsConfig)

  const loggerEngine = log4js.getLogger(config.app.name)

  const escribaConfig = {
    loggerEngine,
    service: config.app.name,
    httpConf: {
      propsToLog: {
        request: [
          'id',
          'method',
          'headers.companyid',
          'headers.referer',
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
          'headers.referer',
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

  return escriba(escribaConfig)
}

module.exports = createLogger
