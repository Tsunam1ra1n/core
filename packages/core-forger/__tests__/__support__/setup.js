const container = require('@phantomchain/core-container')
const containerHelper = require('@phantomchain/core-test-utils/lib/helpers/container')

exports.setUp = async () => {
  await containerHelper.setUp({
    exit: '@phantomchain/core-logger-winston',
  })
}

exports.tearDown = async () => {
  await container.tearDown()
}
