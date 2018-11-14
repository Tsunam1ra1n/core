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
  '@phantomchain/core-api': { },
  '@phantomchain/core-webhooks': {},
  '@phantomchain/core-graphql': {},
  '@phantomchain/core-forger': {}
}
