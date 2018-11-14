const container = require('@phantomchain/core-container')

exports.setUpLite = async options => {
  process.env.PHANTOM_SKIP_BLOCKCHAIN = true
  await container.setUp(options, {
    include: [
      '@phantomchain/core-config',
      '@phantomchain/core-logger',
      '@phantomchain/core-logger-winston',
      '@phantomchain/core-event-emitter',
      '@phantomchain/core-snapshots',
    ],
  })

  return container
}

exports.tearDown = async () => container.tearDown()
