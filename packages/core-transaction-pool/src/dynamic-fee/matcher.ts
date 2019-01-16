import { app } from "@phantomchain/core-container";
import { Logger } from "@phantomchain/core-interfaces";
import { constants, feeManager, formatPhantomtoshi } from "@phantomchain/crypto";
import camelCase from "lodash/camelCase";
import { config as localConfig } from "../config";

/**
 * Calculate minimum fee of a transaction for entering the pool.
 * @param {Number} Minimum fee PHANTOMTOSHI/byte
 * @param {Transaction} Transaction for which we calculate the fee
 * @returns {Number} Calculated minimum acceptable fee in PHANTOMTOSHI
 */
export function calculateFee(phantomtoshiPerByte, transaction) {
    if (phantomtoshiPerByte <= 0) {
        phantomtoshiPerByte = 1;
    }

    const addonBytes = localConfig.get("dynamicFees.addonBytes")[
        camelCase(constants.TransactionTypes[transaction.type])
    ];

    // serialized is in hex
    const transactionSizeInBytes = transaction.serialized.length / 2;

    return (addonBytes + transactionSizeInBytes) * phantomtoshiPerByte;
}

/**
 * Determine if a transaction's fee meets the minimum requirements for broadcasting
 * and for entering the transaction pool.
 * @param {Transaction} Transaction - transaction to check
 * @return {Object} { broadcast: Boolean, enterPool: Boolean }
 */
export function dynamicFeeMatcher(transaction) {
    const logger = app.resolvePlugin<Logger.ILogger>("logger");

    const fee = +transaction.fee.toFixed();
    const id = transaction.id;

    const dynamicFees = localConfig.get("dynamicFees");

    let broadcast;
    let enterPool;

    if (dynamicFees.enabled) {
        const minFeeBroadcast = calculateFee(dynamicFees.minFeeBroadcast, transaction);

        if (fee >= minFeeBroadcast) {
            broadcast = true;
            logger.debug(
                `Transaction ${id} eligible for broadcast - fee of ${formatPhantomtoshi(fee)} is ${
                    fee === minFeeBroadcast ? "equal to" : "greater than"
                } minimum fee (${formatPhantomtoshi(minFeeBroadcast)})`,
            );
        } else {
            broadcast = false;
            logger.debug(
                `Transaction ${id} not eligible for broadcast - fee of ${formatPhantomtoshi(
                    fee,
                )} is smaller than minimum fee (${formatPhantomtoshi(minFeeBroadcast)})`,
            );
        }

        const minFeePool = calculateFee(dynamicFees.minFeePool, transaction);
        if (fee >= minFeePool) {
            enterPool = true;
            logger.debug(
                `Transaction ${id} eligible to enter pool - fee of ${formatPhantomtoshi(fee)} is ${
                    fee === minFeePool ? "equal to" : "greater than"
                } minimum fee (${formatPhantomtoshi(minFeePool)})`,
            );
        } else {
            enterPool = false;
            logger.debug(
                `Transaction ${id} not eligible to enter pool - fee of ${formatPhantomtoshi(
                    fee,
                )} is smaller than minimum fee (${formatPhantomtoshi(minFeePool)})`,
            );
        }
    } else {
        // Static fees
        const staticFee = feeManager.getForTransaction(transaction);

        if (fee === staticFee) {
            broadcast = true;
            enterPool = true;
            logger.debug(
                `Transaction ${id} eligible for broadcast and to enter pool - fee of ${formatPhantomtoshi(
                    fee,
                )} is equal to static fee (${formatPhantomtoshi(staticFee)})`,
            );
        } else {
            broadcast = false;
            enterPool = false;
            logger.debug(
                `Transaction ${id} not eligible for broadcast and not eligible to enter pool - fee of ${formatPhantomtoshi(
                    fee,
                )} does not match static fee (${formatPhantomtoshi(staticFee)})`,
            );
        }
    }

    return { broadcast, enterPool };
}
