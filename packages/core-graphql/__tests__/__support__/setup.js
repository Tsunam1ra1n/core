const container = require('@phantomchain/core-container')
const containerHelper = require('@phantomchain/core-test-utils/lib/helpers/container')

jest.setTimeout(60000)

exports.setUp = async () => {
  process.env.PHANTOM_GRAPHQL_ENABLED = true

  await containerHelper.setUp({
    exclude: ['@phantomchain/core-api', '@phantomchain/core-forger'],
  })

  return container
}

exports.tearDown = async () => {
  await container.tearDown()
}
