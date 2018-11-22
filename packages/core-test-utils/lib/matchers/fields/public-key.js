const { crypto } = require('@phantomchain/crypto')

const toBePhantomPublicKey = received => ({
  message: () => 'Expected value to be a valid public key',
  pass: crypto.validatePublicKey(received),
})

expect.extend({
  toBePhantomPublicKey,
})
