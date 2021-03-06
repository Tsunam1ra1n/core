const { MULTI_SIGNATURE } = require('@phantomchain/crypto').constants

const toBeMultiSignatureType = received => ({
  message: () => 'Expected value to be a valid MULTI_SIGNATURE transaction.',
  pass: received.type === MULTI_SIGNATURE,
})

expect.extend({
  toBeMultiSignatureType,
})
