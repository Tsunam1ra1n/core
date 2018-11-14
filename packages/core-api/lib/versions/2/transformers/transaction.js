'use strict'

const container = require('@phantomchain/core-container')
const config = container.resolvePlugin('config')
const blockchain = container.resolvePlugin('blockchain')

const { crypto } = require('@phantomchain/crypto')
const { Transaction } = require('@phantomchain/crypto').models

const { bignumify, formatTimestamp } = require('@phantomchain/core-utils')

/**
 * Turns a "transaction" object into a generic object.
 * @param  {Object} model
 * @return {Object}
 */
module.exports = model => {
  const data = new Transaction(model.serialized.toString('hex'))
  const lastBlock = blockchain.getLastBlock()

  return {
    id: data.id,
    blockId: model.blockId,
    type: data.type,
    amount: +bignumify(data.amount).toFixed(),
    fee: +bignumify(data.fee).toFixed(),
    sender: crypto.getAddress(data.senderPublicKey, config.network.pubKeyHash),
    recipient: data.recipientId,
    signature: data.signature,
    signSignature: data.signSignature,
    signatures: data.signatures,
    vendorField: data.vendorField,
    asset: data.asset,
    confirmations: model.block ? lastBlock.data.height - model.block.height : 0,
    timestamp: formatTimestamp(data.timestamp),
  }
}
