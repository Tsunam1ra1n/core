export const transactionArray = joi => ({
    name: "phantomTransactionArray",
    base: joi
        .array()
        .items(
            joi
                .alternatives()
                .try(
                    joi.phantomTransfer(),
                    joi.phantomSecondSignature(),
                    joi.phantomDelegateRegistration(),
                    joi.phatnomVote(),
                    joi.phantomMultiSignature(),
                ),
        ),
});
