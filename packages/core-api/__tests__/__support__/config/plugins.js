module.exports = {
  '@phantomchain/core-event-emitter': {},
  '@phantomchain/core-config': {},
  '@phantomchain/core-logger': {},
  '@phantomchain/core-logger-winston': {},
  '@phantomchain/core-database': {},
  '@phantomchain/core-database-sequelize': {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  '@phantomchain/core-transaction-pool': {},
  '@phantomchain/core-transaction-pool-redis': {},
  '@phantomchain/core-p2p': {},
  '@phantomchain/core-blockchain': {},
  '@phantomchain/core-api': {
    enabled: true,
    whitelist: [
      '127.0.0.1',
      '::ffff:127.0.0.1'
    ]
  },
  '@phantomchain/core-webhooks': {},
  '@phantomchain/core-forger': {}
}
