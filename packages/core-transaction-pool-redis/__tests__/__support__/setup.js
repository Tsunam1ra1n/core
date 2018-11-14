'use strict';

const path = require('path')
const container = require('@phantomchain/core-container')

jest.setTimeout(30000)

exports.setUp = async () => {
  await container.setUp({
    data: '~/.phantom',
    config: path.resolve(__dirname, '../../../core/lib/config/testnet'),
    token: 'phantom',
    network: 'testnet'
  }, {
    exit: '@phantomchain/core-blockchain',
    exclude: [
      '@phantomchain/core-transaction-pool-redis',
      '@phantomchain/core-p2p'
    ]
  })
}

exports.tearDown = async () => {
  await container.tearDown()
}
