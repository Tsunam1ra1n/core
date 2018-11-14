const container = require('@phantomchain/core-container')
const containerHelper = require('@phantomchain/core-test-utils/lib/helpers/container')

jest.setTimeout(60000)

exports.setUp = async () => {
  await containerHelper.setUp({
    exit: '@phantomchain/core-blockchain',
  })
}

exports.tearDown = async () => {
  await container.tearDown()
}
