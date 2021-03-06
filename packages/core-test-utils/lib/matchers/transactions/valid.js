const { crypto } = require('@phantomchain/crypto')

const toBeValidTransaction = (transaction, network) => ({
  message: () => 'Expected value to be a valid transaction',
  pass: crypto.verify(transaction, network),
})

expect.extend({
  toBeValidTransaction,
})
