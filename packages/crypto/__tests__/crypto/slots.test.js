const configManager = require('../../lib/managers/config')
const network = require('../../lib/networks/phantom/devnet.json')
const slots = require('../../lib/crypto/slots')

beforeEach(() => configManager.setConfig(network))

describe('Slots', () => {
  describe('getEpochTime', () => {
    it('should be a function', () => {
      expect(slots.getEpochTime).toBeFunction()
    })

    it('return epoch datetime', () => {
      expect(slots.getEpochTime()).toBeNumber()
    })
  })

  describe('beginEpochTime', () => {
    it('should be a function', () => {
      expect(slots.beginEpochTime).toBeFunction()
    })

    it('return epoch datetime', () => {
      expect(slots.beginEpochTime().format()).toBe('2017-03-21T13:00:00Z')
    })

    it('return epoch datetime', () => {
      expect(slots.beginEpochTime().unix()).toBe(1490101200)
    })
  })

  describe('getTime', () => {
    it('should be a function', () => {
      expect(slots.getTime).toBeFunction()
    })

    it('return epoch time as number', () => {
      const result = slots.getTime(1490101210000)

      expect(result).toBeNumber()
      expect(result).toEqual(10)
    })
  })

  describe('getRealTime', () => {
    it('should be a function', () => {
      expect(slots.getRealTime).toBeFunction()
    })

    it('return return real time', () => {
      expect(slots.getRealTime(10)).toBe(1490101210000)
    })
  })

  describe('getSlotNumber', () => {
    it('should be a function', () => {
      expect(slots.getSlotNumber).toBeFunction()
    })

    it('return slot number', () => {
      expect(slots.getSlotNumber(10)).toBe(1)
    })
  })

  describe('getSlotTime', () => {
    it('should be a function', () => {
      expect(slots.getSlotTime).toBeFunction()
    })

    it('returns slot time', () => {
      expect(slots.getSlotTime(19614)).toBe(156912)
    })
  })

  describe('getNextSlot', () => {
    it('should be a function', () => {
      expect(slots.getNextSlot).toBeFunction()
    })

    it('returns next slot', () => {
      expect(slots.getNextSlot()).toBeNumber()
    })
  })

  describe('getLastSlot', () => {
    it('should be a function', () => {
      expect(slots.getLastSlot).toBeFunction()
    })

    it('returns last slot', () => {
      expect(slots.getLastSlot(1)).toBe(52)
    })
  })

  describe('getConstant', () => {
    it('should be a function', () => {
      expect(slots.getConstant).toBeFunction()
    })

    it('returns constant', () => {
      expect(slots.getConstant('epoch')).toBe('2018-12-26T02:00:00.000Z')
    })
  })

  describe('isForgingAllowed', () => {
    it('should be a function', () => {
      expect(slots.isForgingAllowed).toBeFunction()
    })

    it('returns boolean', () => {
      expect(slots.isForgingAllowed()).toBeDefined()
    })
  })
})
