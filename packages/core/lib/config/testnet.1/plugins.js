module.exports = {
  '@phantomcore/core-event-emitter': {},
  '@phantomcore/core-config': {},
  '@phantomcore/core-logger': {},
  '@phantomcore/core-logger-winston': {
    transports: {
      console: {
        options: {
          colorize: true,
          level: process.env.PHANTOM_LOG_LEVEL || 'debug',
        },
      },
      dailyRotate: {
        options: {
          filename:
            process.env.PHANTOM_LOG_FILE ||
            `${process.env.PHANTOM_PATH_DATA}/logs/core/${
              process.env.PHANTOM_NETWORK_NAME
            }.1/%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          level: process.env.PHANTOM_LOG_LEVEL || 'debug',
          zippedArchive: true,
        },
      },
    },
  },
  '@phantomchain/core-database-postgres': {
    connection: {
      host: process.env.PHANTOM_DB_HOST || 'localhost',
      port: process.env.PHANTOM_DB_PORT || 5432,
      database:
        process.env.PHANTOM_DB_DATABASE ||
        `phantom_${process.env.PHANTOM_NETWORK_NAME}1`,
      user: process.env.PHANTOM_DB_USERNAME || 'phantom',
      password: process.env.PHANTOM_DB_PASSWORD || 'password',
    },
  },
  '@phantomchain/core-transaction-pool-mem': {
    enabled: true,
    storage: `${process.env.PHANTOM_PATH_DATA}/database/transaction-pool-${
      process.env.PHANTOM_NETWORK_NAME
    }.sqlite`,
    maxTransactionsPerSender:
      process.env.PHANTOM_TRANSACTION_POOL_MAX_PER_SENDER || 300,
    whitelist: [],
    allowedSenders: [],
    maxTransactionsPerRequest: 40,
    maxTransactionAge: 2700,
  },
  '@phantomchain/core-p2p': {
    host: process.env.PHANTOM_P2P_HOST || '0.0.0.0',
    port: process.env.PHANTOM_P2P_PORT || 4102,
    whitelist: ['127.0.0.1', '::ffff:127.0.0.1', '192.168.*'],
  },
  '@phantomchain/core-blockchain': {
    fastRebuild: true,
  },
  '@phantomcore/core-api': {
    enabled: !process.env.PHANTOM_API_DISABLED,
    host: process.env.PHANTOM_API_HOST || '0.0.0.0',
    port: process.env.PHANTOM_API_PORT || 4103,
    whitelist: ['*'],
  },
  '@phantomcore/core-webhooks': {
    enabled: process.env.PHANTOM_WEBHOOKS_ENABLED,
    database: {
      dialect: 'sqlite',
      storage: `${process.env.PHANTOM_PATH_DATA}/database/${
        process.env.PHANTOM_NETWORK_NAME
      }.1/webhooks.sqlite`,
      logging: process.env.PHANTOM_DB_LOGGING,
    },
    redis: {
      host: process.env.PHANTOM_REDIS_HOST || 'localhost',
      port: process.env.PHANTOM_REDIS_PORT || 6379,
    },
    server: {
      enabled: process.env.PHANTOM_WEBHOOKS_API_ENABLED,
      host: process.env.PHANTOM_WEBHOOKS_HOST || '0.0.0.0',
      port: process.env.PHANTOM_WEBHOOKS_PORT || 4004,
      whitelist: ['127.0.0.1', '::ffff:127.0.0.1', '192.168.*'],
    },
  },
  '@phantomcore/core-graphql': {
    enabled: process.env.PHANTOM_GRAPHQL_ENABLED,
    host: process.env.PHANTOM_GRAPHQL_HOST || '0.0.0.0',
    port: process.env.PHANTOM_GRAPHQL_PORT || 4105,
    path: '/graphql',
    graphiql: true
  },
  '@phantomchain/core-forger': {
    hosts: ['http://127.0.0.1:4102'],
  },
  '@phantomcore/core-json-rpc': {
    enabled: process.env.PHANTOM_JSON_RPC_ENABLED,
    host: process.env.PHANTOM_JSON_RPC_HOST || '0.0.0.0',
    port: process.env.PHANTOM_JSON_RPC_PORT || 8080,
    allowRemote: true,
    whitelist: ['127.0.0.1', '::ffff:127.0.0.1', '192.168.*'],
  },
}
