'use strict'

const path = require('path')
const container = require('@phantomchain/core-container')

exports.setUp = async () => {
  jest.setTimeout(10000)

  process.env.PHANTOM_SKIP_BLOCKCHAIN = true

  await container.setUp({
    data: '~/.phantom',
    config: path.resolve(__dirname, '../../../core/lib/config/testnet'),
    token: 'phantom',
    network: 'testnet'
  }, {
    exit: '@phantomchain/core-blockchain',
    exclude: [
      '@phantomchain/core-p2p',
      '@phantomchain/core-transaction-pool',
      '@phantomchain/core-transaction-pool-redis'
    ]
  })
}

exports.tearDown = async () => {
  await container.tearDown()
}
