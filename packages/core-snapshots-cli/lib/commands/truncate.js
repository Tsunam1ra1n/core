const container = require('@phantomchain/core-container')

const snapshotManager = container.resolvePlugin('snapshots')

module.exports = async options => {
  await snapshotManager.truncateChain()
}
