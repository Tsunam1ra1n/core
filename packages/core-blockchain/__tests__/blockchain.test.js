'use strict'

const { asValue } = require('awilix')
const { slots } = require('@phantomcore/crypto')

const app = require('./__support__/setup')

let genesisBlock
let container
let blockchain

beforeAll(async () => {
  container = await app.setUp()

  // Create the genesis block after the setup has finished or else it uses a potentially
  // wrong network config.
  genesisBlock = require('./__fixtures__/genesisBlock')
})

afterAll(async () => {
  await app.tearDown()
})

beforeEach(async () => {
  process.env.PHANTOM_SKIP_BLOCKCHAIN = true

  // manually register the blockchain
  const plugin = require('../lib').plugin

  blockchain = await plugin.register(container, {
    networkStart: false
  })

  await container.register('blockchain', asValue({
    name: 'blockchain',
    version: '0.1.0',
    plugin: blockchain,
    options: {}
  }))
})

afterEach(async () => {
  process.env.PHANTOM_SKIP_BLOCKCHAIN = false

  await blockchain.resetState()
})

describe('Blockchain', () => {
  it('should be an object', () => {
    expect(blockchain).toBeObject()
  })

  describe('dispatch', () => {
    it('should be a function', () => {
      expect(blockchain.dispatch).toBeFunction()
    })

    it('should be ok', () => {
      const nextState = blockchain.dispatch('START')

      expect(blockchain.stateMachine.state.blockchain).toEqual(nextState)
    })
  })

  describe('start', () => {
    it('should be a function', () => {
      expect(blockchain.start).toBeFunction()
    })

    it('should be ok', async () => {
      process.env.PHANTOM_SKIP_BLOCKCHAIN = false

      const started = await blockchain.start(true)

      expect(started).toBeTruthy()
    })
  })

  describe('checkNetwork', () => {
    it('should be a function', () => {
      expect(blockchain.checkNetwork).toBeFunction()
    })

    it('should throw an exception', () => {
      expect(() => blockchain.checkNetwork()).toThrowError('Method [checkNetwork] not implemented!')
    })
  })

  describe.skip('updateNetworkStatus', () => {
    it('should be a function', () => {
      expect(blockchain.updateNetworkStatus).toBeFunction()
    })
  })

  describe('rebuild', () => {
    it('should be a function', () => {
      expect(blockchain.rebuild).toBeFunction()
    })

    it('should throw an exception', () => {
      expect(() => blockchain.rebuild()).toThrowError('Method [rebuild] not implemented!')
    })
  })

  describe('resetState', () => {
    it('should be a function', () => {
      expect(blockchain.resetState).toBeFunction()
    })

    it('should be ok', async () => {
      await blockchain.resetState()

      expect(blockchain.stateMachine.state).toEqual({
        blockchain: blockchain.stateMachine.initialState,
        started: false,
        lastBlock: null,
        lastDownloadedBlock: null
      })
    })
  })

  describe('postTransactions', () => {
    it('should be a function', () => {
      expect(blockchain.postTransactions).toBeFunction()
    })

    it('should be ok', async () => {
      const response = await blockchain.postTransactions(genesisBlock.transactions, false)

      expect(genesisBlock.transactions.length).toBe(52)
      expect(response.length).toBe(52)
    })
  })

  describe('queueBlock', () => {
    it('should be a function', () => {
      expect(blockchain.queueBlock).toBeFunction()
    })

    it('should be ok', async () => {
      blockchain.queueBlock = jest.fn(block => (blockchain.stateMachine.state.lastDownloadedBlock = block))

      await blockchain.queueBlock(genesisBlock)

      expect(blockchain.stateMachine.state.lastDownloadedBlock).toEqual(genesisBlock)
    })
  })

  describe.skip('rollbackCurrentRound', () => {
    it('should be a function', () => {
      expect(blockchain.rollbackCurrentRound).toBeFunction()
    })
  })

  describe.skip('removeBlocks', () => {
    it('should be a function', () => {
      expect(blockchain.removeBlocks).toBeFunction()
    })
  })

  describe.skip('rebuildBlock', () => {
    it('should be a function', () => {
      expect(blockchain.rebuildBlock).toBeFunction()
    })
  })

  describe.skip('processBlock', () => {
    it('should be a function', () => {
      expect(blockchain.processBlock).toBeFunction()
    })
  })

  describe.skip('acceptChainedBlock', () => {
    it('should be a function', () => {
      expect(blockchain.acceptChainedBlock).toBeFunction()
    })
  })

  describe.skip('manageUnchainedBlock', () => {
    it('should be a function', () => {
      expect(blockchain.manageUnchainedBlock).toBeFunction()
    })
  })

  describe.skip('getUnconfirmedTransactions', () => {
    it('should be a function', () => {
      expect(blockchain.getUnconfirmedTransactions).toBeFunction()
    })
  })

  describe('isSynced', () => {
    it('should be a function', () => {
      expect(blockchain.isSynced).toBeFunction()
    })

    describe('with a block param', () => {
      it('should be ok', () => {
        expect(blockchain.isSynced({
          timestamp: slots.getTime() - genesisBlock.data.timestamp,
          height: genesisBlock.data.height
        })).toBeTruthy()
      })
    })

    // TODO check that works well with Redis fixed
    xdescribe('without a block param', () => {
      it('should use the last block', () => {
        blockchain.getLastBlock = jest.fn(() => ({
          timestamp: slots.getTime() - genesisBlock.data.timestamp,
          height: genesisBlock.data.height
        }))
        expect(blockchain.isSynced()).toBeTruthy()
        expect(blockchain.getLastBlock()).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('isRebuildSynced', () => {
    it('should be a function', () => {
      expect(blockchain.isRebuildSynced).toBeFunction()
    })

    describe('with a block param', () => {
      it('should be ok', () => {
        expect(blockchain.isRebuildSynced({
          timestamp: slots.getTime() - genesisBlock.data.timestamp,
          height: genesisBlock.data.height
        })).toBeTruthy()
      })
    })

    // TODO check that works well with Redis fixed
    xdescribe('without a block param', () => {
      it('should use the last block', () => {
        blockchain.getLastBlock = jest.fn(() => ({
          timestamp: slots.getTime() - genesisBlock.data.timestamp,
          height: genesisBlock.data.height
        }))
        expect(blockchain.isRebuildSynced()).toBeTruthy()
        expect(blockchain.getLastBlock()).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('getLastBlock', () => {
    it('should be a function', () => {
      expect(blockchain.getLastBlock).toBeFunction()
    })

    it('should be ok', () => {
      blockchain.stateMachine.state.lastBlock = genesisBlock

      expect(blockchain.getLastBlock()).toEqual(genesisBlock)
    })

    it('should be ok using onlyData', () => {
      blockchain.stateMachine.state.lastBlock = genesisBlock

      expect(blockchain.getLastBlock()).toEqual(genesisBlock.data)
    })
  })

  describe('__isChained', () => {
    it('should be a function', () => {
      expect(blockchain.__isChained).toBeFunction()
    })

    it('should be ok', () => {
      const previousBlock = {
        data: {
          id: 1,
          timestamp: 1,
          height: 1
        }
      }

      const nextBlock = {
        data: {
          id: 2,
          timestamp: 2,
          height: 2,
          previousBlock: 1
        }
      }

      expect(blockchain.__isChained(previousBlock, nextBlock)).toBeTruthy()
    })

    it('should not be ok', () => {
      const previousBlock = {
        data: {
          id: 2,
          timestamp: 2,
          height: 2
        }
      }

      const nextBlock = {
        data: {
          id: 1,
          timestamp: 1,
          height: 1,
          previousBlock: 1
        }
      }

      expect(blockchain.__isChained(previousBlock, nextBlock)).toBeFalsy()
    })
  })

  describe('__registerQueue', () => {
    it('should be a function', () => {
      expect(blockchain.__registerQueue).toBeFunction()
    })

    it('should be ok', () => {
      blockchain.__registerQueue()

      expect(blockchain).toHaveProperty('queue')
      expect(blockchain).toHaveProperty('processQueue')
      expect(blockchain).toHaveProperty('rebuildQueue')
    })
  })
})

async function __start() {
  process.env.PHANTOM_SKIP_BLOCKCHAIN = false
  process.env.PHANTOM_ENV = false

  const plugin = require('../lib').plugin

  blockchain = await plugin.register(container, {
    networkStart: false,
  })

  await container.register(
    'blockchain',
    asValue({
      name: 'blockchain',
      version: '0.1.0',
      plugin: blockchain,
      options: {},
    }),
  )

  const p2p = container.resolvePlugin('p2p')
  await p2p.acceptNewPeer(peerMock)

  await __resetToHeight1()

  await blockchain.start(true)
  while (
    !blockchain.getLastBlock() ||
    blockchain.getLastBlock().data.height < 155
  ) {
    await delay(1000)
  }
}

async function __resetToHeight1() {
  const lastBlock = await blockchain.database.getLastBlock()
  if (lastBlock) {
    // Make sure the wallet manager has been fed or else revertRound
    // cannot determine the previous delegates. This is only necessary, because
    // the database is not dropped after the unit tests are done.
    await blockchain.database.buildWallets(lastBlock.data.height)

    // Index the genesis wallet or else revert block at height 1 fails
    const generator = crypto.getAddress(genesisBlock.data.generatorPublicKey)
    const genesis = new Wallet(generator)
    genesis.publicKey = genesisBlock.data.generatorPublicKey
    genesis.username = 'genesis'
    blockchain.database.walletManager.reindex(genesis)

    blockchain.state.clear()

    blockchain.state.setLastBlock(lastBlock)
    await blockchain.removeBlocks(lastBlock.data.height - 1)
  }
}

function __mockPeer() {
  // Mocking a peer which will send blocks until height 155
  const Peer = require('@phantomchain/core-p2p/lib/peer')
  peerMock = new Peer('0.0.0.99', 4002)
  Object.assign(peerMock, peerMock.headers, { status: 200 })

  axiosMock
    .onGet(/.*\/peer\/blocks\/common.*/)
    .reply(() => [
      200,
      { status: 200, success: true, common: true },
      peerMock.headers,
    ])
  axiosMock.onGet(/.*\/peer\/blocks/).reply(config => {
    const blocks =
      config.params.lastBlockHeight === 1
        ? blocks1to100
        : config.params.lastBlockHeight === 100
        ? blocks101to155
        : []

    return [200, { status: 200, success: true, blocks }, peerMock.headers]
  })
  axiosMock
    .onGet(/.*\/peer\/status/)
    .reply(() => [
      200,
      { status: 200, success: true, height: 155 },
      peerMock.headers,
    ])
  axiosMock.onGet(/.*\/peer\/list/).reply(() => [
    200,
    {
      success: true,
      peers: [
        {
          status: 200,
          ip: peerMock.ip,
          port: 4002,
          height: 155,
          delay: 8,
        },
      ],
    },
    peerMock.headers,
  ])
}
