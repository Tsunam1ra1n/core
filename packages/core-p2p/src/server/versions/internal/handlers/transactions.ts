import { app } from "@phantomchain/core-container";
import { PostgresConnection } from "@phantomchain/core-database-postgres";
import { Blockchain } from "@phantomchain/core-interfaces";
import { models } from "@phantomchain/crypto";
import * as schema from "../schemas/transactions";

const config = app.getConfig();
const { Transaction } = models;

/**
 * @type {Object}
 */
export const verify = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    async handler(request, h) {
        const transaction = new Transaction(Transaction.deserialize(request.payload.transaction));

        return {
            data: {
                valid: await app.resolvePlugin<PostgresConnection>("database").verifyTransaction(transaction),
            },
        };
    },
    options: {
        validate: schema.verify,
    },
};

/**
 * @type {Object}
 */
export const forging = {
    /**
     * @param  {Hapi.Request} request
     * @param  {Hapi.Toolkit} h
     * @return {Hapi.Response}
     */
    handler(request, h) {
        const blockchain = app.resolvePlugin<Blockchain.IBlockchain>("blockchain");

        const height = blockchain.getLastBlock().data.height;
        const maxTransactions = config.getMilestone(height).block.maxTransactions;

        return {
            data: blockchain.getUnconfirmedTransactions(maxTransactions),
        };
    },
};
