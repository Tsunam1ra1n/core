'use strict'

const container = require('@phantomchain/core-container')

/**
 * Start a relay.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async options => {
  await container.setUp(options, {
    exclude: ['@phantomchain/core-forger'],
    options: {
      '@phantomchain/core-p2p': {
        networkStart: options.networkStart,
        disableDiscovery: options.disableDiscovery,
        skipDiscovery: options.skipDiscovery,
      },
      '@phantomchain/core-blockchain': {
        networkStart: options.networkStart,
      },
    },
  })
}
