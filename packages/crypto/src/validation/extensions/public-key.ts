export const publicKey = joi => ({
    name: "phantomPublicKey",
    base: joi
        .string()
        .hex()
        .length(66),
});
