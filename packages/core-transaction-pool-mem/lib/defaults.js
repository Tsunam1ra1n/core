module.exports = {
  enabled: !process.env.PHANTOM_TRANSACTION_POOL_DISABLED,
  syncInterval: 512,
  storage: `${process.env.PHANTOM_PATH_DATA}/database/transaction-pool-${
    process.env.PHANTOM_NETWORK_NAME
  }.sqlite`,
  maxTransactionsPerSender:
    process.env.PHANTOM_TRANSACTION_POOL_MAX_PER_SENDER || 300,
  whitelist: [],
  allowedSenders: [],
  maxTransactionsPerRequest: 40,
  maxTransactionAge: 2700,
}
