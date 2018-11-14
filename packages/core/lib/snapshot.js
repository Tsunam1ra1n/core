'use strict'

const container = require('@phantomchain/core-container')

/**
 * Create a snapshot.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await container.setUp(options, {
    include: [
      '@phantomchain/core-event-emitter',
      '@phantomchain/core-config',
      '@phantomchain/core-logger',
      '@phantomchain/core-logger-winston',
      '@phantomchain/core-database',
      '@phantomchain/core-database-sequelize',
      '@phantomchain/core-blockchain'
    ],
    options: {
      '@phantomchain/core-blockchain': {
        networkStart: options.networkStart
      }
    }
  })

  container.resolvePlugin('database').snapshot()
}
