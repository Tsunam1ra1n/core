import { Joi } from "@phantomchain/crypto";

/**
 * @type {Object}
 */
export const store = {
    payload: {
        block: Joi.phantomBlock().options({ stripUnknown: true }),
    },
};
