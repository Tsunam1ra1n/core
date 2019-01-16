import { PHANTOMTOSHI } from "../constants";
import { configManager } from "../managers";

/**
 * Get human readable string from phantomtoshis
 * @param  {Number|String|Bignum} amount
 * @return {String}
 */
export const formatPhantomtoshi = amount => {
    const localeString = (+amount / PHANTOMTOSHI).toLocaleString("en", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
    });

    return `${localeString} ${configManager.config.client.symbol}`;
};
