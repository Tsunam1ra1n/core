'use strict'

const container = require('@phantomchain/core-container')

/**
 * Start a forger.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async options => {
  await container.setUp(options, {
    include: [
      '@phantomchain/core-event-emitter',
      '@phantomchain/core-config',
      '@phantomchain/core-logger',
      '@phantomchain/core-logger-winston',
      '@phantomchain/core-forger',
    ],
    options: {
      '@phantomchain/core-forger': {
        bip38: options.bip38 || process.env.PHANTOM_FORGER_BIP38,
        address: options.address,
        password: options.password || process.env.PHANTOM_FORGER_PASSWORD,
      },
    },
  })
}
