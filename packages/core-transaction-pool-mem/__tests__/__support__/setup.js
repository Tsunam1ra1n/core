const container = require('@phantomchain/core-container')
const containerHelper = require('@phantomchain/core-test-utils/lib/helpers/container')

jest.setTimeout(30000)

exports.setUp = async () => {
  await containerHelper.setUp({
    exit: '@phantomchain/core-blockchain',
    exclude: ['@phantomchain/core-transaction-pool-mem'],
  })
}

exports.tearDown = async () => {
  await container.tearDown()
}
