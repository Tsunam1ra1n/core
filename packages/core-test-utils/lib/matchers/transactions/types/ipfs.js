const { IPFS } = require('@phantomchain/crypto').constants

const toBeIpfsType = received => ({
  message: () => 'Expected value to be a valid IPFS transaction.',
  pass: received.type === IPFS,
})

expect.extend({
  toBeIpfsType,
})
