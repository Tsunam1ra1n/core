const { bignumify } = require('@phantomchain/core-utils')

module.exports = (delegates, round) => delegates.map(delegate => ({
  round,
  publicKey: delegate,
  voteBalance: bignumify('245098000000000'),
}))
