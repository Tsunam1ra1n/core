import { TransactionTypes } from "../../../constants";
import { base as transaction } from "./base";

export const multiPayment = joi => ({
    name: "phantomMultiPayment",
    base: transaction(joi).append({
        type: joi
            .number()
            .only(TransactionTypes.MultiPayment)
            .required(),
        asset: joi.object().required(),
        recipientId: joi.empty(),
    }),
});
