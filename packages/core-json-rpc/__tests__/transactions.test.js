const request = require('./__support__/request')
const phantom = require('@phantomcore/crypto')

require('./__support__/setup')

describe('Transactions', () => {
  describe('POST /mainnet/transactions', () => {
    let transaction

    it('should create tx on mainnet and tx should verify', async () => {
      const response = await request('transactions.create', {
        amount: 100000000,
        recipientId: 'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv',
        passphrase: 'This is a test'
      })

      expect(response.data.result.recipientId).toBe(
        'APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn',
      )
      expect(crypto.verify(response.data.result)).toBeTrue()
    })
  })

  describe('POST transactions.broadcast', () => {
    it('should broadcast the transaction', async () => {
      const transaction = await request('transactions.create', {
        amount: 100000000,
        recipientId: 'APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn',
        passphrase: 'this is a top secret passphrase',
      })

      axiosMock
        .onPost(/.*\/api\/transactions/)
        .reply(() => [200, { success: true }, peerMock.headers])

      const response = await request('transactions.broadcast', {
        id: transaction.data.result.id,
      })

      transaction = response.data.result
    })

    it('should broadcast tx on mainnet using the old method', async () => {
      const response = await request('transactions.broadcast', {
        transactions: [transaction]
      })

      expect(response.data.error.code).toBe(404)
      expect(response.data.error.message).toBe(
        'Transaction e4311204acf8a86ba833e494f5292475c6e9e0913fc455a12601b4b6b55818d8 could not be found.',
      )
    })
  })

  describe('POST transactions.bip38.create', () => {
    it('should create a new transaction', async () => {
      const userId = require('crypto')
        .randomBytes(32)
        .toString('hex')
      await request('wallets.bip38.create', {
        bip38: 'this is a top secret passphrase',
        userId,
      })

      const response = await request('transactions.bip38.create', {
        bip38: 'this is a top secret passphrase',
        userId,
        amount: 1000000000,
        recipientId: 'APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn',
      })

      expect(response.data.result.recipientId).toBe(
        'APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn',
      )
      expect(crypto.verify(response.data.result)).toBeTrue()
    })

    it('should fail to create a new transaction', async () => {
      const response = await request('transactions.bip38.create', {
        bip38: 'this is a top secret passphrase',
        userId: '123456789',
        amount: 1000000000,
        recipientId: 'APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn',
      })

      expect(response.data.error.code).toBe(404)
      expect(response.data.error.message).toBe(
        'User 123456789 could not be found.',
      )
    })
  })
})
