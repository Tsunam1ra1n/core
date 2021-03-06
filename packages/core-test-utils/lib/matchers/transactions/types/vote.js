const { VOTE } = require('@phantomchain/crypto').constants

const toBeVoteType = received => ({
  message: () => 'Expected value to be a valid VOTE transaction.',
  pass: received.type === VOTE,
})

expect.extend({
  toBeVoteType,
})
