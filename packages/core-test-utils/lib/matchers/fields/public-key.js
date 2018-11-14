'use strict'

const { crypto } = require('@phantomchain/crypto')

const toBeArkPublicKey = received => ({
  message: () => 'Expected value to be a valid public key',
  pass: crypto.validatePublicKey(received),
})

expect.extend({
  toBeArkPublicKey,
})
