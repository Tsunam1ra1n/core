module.exports = {
    "@phantomchain/core-event-emitter": {},
    "@phantomchain/core-logger-winston": {
        transports: {
            console: {
                options: {
                    level: process.env.PHANTOM_LOG_LEVEL || "debug",
                },
            },
            dailyRotate: {
                options: {
                    level: process.env.PHANTOM_LOG_LEVEL || "debug",
                },
            },
        },
    },
    "@phantomchain/core-database-postgres": {
        connection: {
            host: process.env.PHANTOM_DB_HOST || "localhost",
            port: process.env.PHANTOM_DB_PORT || 5432,
            database: process.env.PHANTOM_DB_DATABASE || "phantom_development",
            user: process.env.PHANTOM_DB_USERNAME || "phantom",
            password: process.env.PHANTOM_DB_PASSWORD || "password",
        },
    },
    "@phantomchain/core-transaction-pool": {
        enabled: !process.env.PHANTOM_TRANSACTION_POOL_DISABLED,
        maxTransactionsPerSender: process.env.PHANTOM_TRANSACTION_POOL_MAX_PER_SENDER || 300,
        allowedSenders: [],
        // 100+ years in the future to avoid our hardcoded transactions used in the
        // tests to expire immediately
        maxTransactionAge: 4036608000,
    },
    "@phantomchain/core-p2p": {
        host: process.env.PHANTOM_P2P_HOST || "0.0.0.0",
        port: process.env.PHANTOM_P2P_PORT || 4000,
        whitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
    },
    "@phantomchain/core-blockchain": {
        fastRebuild: false,
    },
    "@phantomchain/core-forger": {
        hosts: [`http://127.0.0.1:${process.env.PHANTOM_P2P_PORT || 4000}`],
    },
};
