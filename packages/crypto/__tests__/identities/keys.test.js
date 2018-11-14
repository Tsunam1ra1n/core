const testSubject = require('../../lib/identities/keys')
const Address = require('../../lib/identities/address')

describe('Identities - Keys', () => {
  describe('fromPassphrase', () => {
    it('should be a function', () => {
      expect(testSubject.fromPassphrase).toBeFunction()
    })

    it('should return two keys in hex', () => {
      const keys = testSubject.fromPassphrase('secret')

      expect(keys).toBeObject()
      expect(keys).toHaveProperty('publicKey')
      expect(keys).toHaveProperty('privateKey')

      expect(keys.publicKey).toBeString()
      expect(keys.publicKey).toMatch(
        Buffer.from(keys.publicKey, 'hex').toString('hex'),
      )

      expect(keys.privateKey).toBeString()
      expect(keys.privateKey).toMatch(
        Buffer.from(keys.privateKey, 'hex').toString('hex'),
      )
    })

    it('should return address', () => {
      const keys = testSubject.fromPassphrase(
        'UjXzgFQaNuNAKt6x6Q4N1mFjAVuCyiL84X1Pyo1jJtg5FKSQRtky',
      )
      const address = Address.fromPublicKey(keys.publicKey.toString('hex'))
      expect(address).toBe('PPgjMzg8yDHckCRXeL6p1BF4hZt9rmcxuX')
    })
  })

  describe('fromWIF', () => {
    it('should be a function', () => {
      expect(testSubject.fromWIF).toBeFunction()
    })

    it('should return two keys in hex', () => {
      const keys = testSubject.fromWIF(
        'UjXzgFQaNuNAKt6x6Q4N1mFjAVuCyiL84X1Pyo1jJtg5FKSQRtky',
      )

      expect(keys).toBeObject()
      expect(keys).toHaveProperty('publicKey')
      expect(keys).toHaveProperty('privateKey')

      expect(keys.publicKey).toBeString()
      expect(keys.publicKey).toMatch(
        Buffer.from(keys.publicKey, 'hex').toString('hex'),
      )

      expect(keys.privateKey).toBeString()
      expect(keys.privateKey).toMatch(
        Buffer.from(keys.privateKey, 'hex').toString('hex'),
      )
    })

    it('should return address', () => {
      const keys = testSubject.fromWIF(
        'UjXzgFQaNuNAKt6x6Q4N1mFjAVuCyiL84X1Pyo1jJtg5FKSQRtky',
      )
      const address = Address.fromPublicKey(keys.publicKey.toString('hex'))
      expect(address).toBe('PFcf1hqNTDTGC89aUbzY3f4AkrKKupteyH')
    })

    it('should get keys from compressed WIF', () => {
      const keys = testSubject.fromWIF(
        'UgSJ3cLvUy6idz2ZBitXUQx4HXCEHbXcpY6ezChQn3pPdrjbTAbJ',
      )

      expect(keys).toBeObject()
      expect(keys).toHaveProperty('publicKey')
      expect(keys).toHaveProperty('privateKey')
      expect(keys).toHaveProperty('compressed', true)
    })

    it('should get keys from uncompressed WIF', () => {
      const keys = testSubject.fromWIF(
        '7GjSACdgkwrKx3xBTu5sriDvm585NS3QXFkRU1PJAkgjjsooZUY',
      )

      expect(keys).toBeObject()
      expect(keys).toHaveProperty('publicKey')
      expect(keys).toHaveProperty('privateKey')
      expect(keys).toHaveProperty('compressed', false)
    })
  })
})
