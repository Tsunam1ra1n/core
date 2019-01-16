import "../../../src/transactions/types/transfer";

import { constants } from "@phantomchain/crypto";
const { TransactionTypes } = constants;

describe(".toBeTransferType", () => {
    test("passes when given a valid transaction", () => {
        expect({ type: TransactionTypes.Transfer }).toBeTransferType();
    });

    test("fails when given an invalid transaction", () => {
        expect({ type: "invalid" }).not.toBeTransferType();
    });
});
