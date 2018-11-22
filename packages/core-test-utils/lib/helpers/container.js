const path = require('path')
const container = require('@phantomchain/core-container')

module.exports = {
  setUp: async options =>
    container.setUp(
      {
        data: options.data || '~/.phantom',
        config: options.config
          ? options.config
          : path.resolve(__dirname, '../../config/testnet'),
        token: options.token || 'phantom',
        network: options.network || 'testnet',
      },
      options,
    ),
}
