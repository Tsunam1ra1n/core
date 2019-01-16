import "jest-extended";
import { client as phantom } from "../../../src/client";
import { TransactionTypes } from "../../../src/constants";
import { feeManager } from "../../../src/managers/fee";
import { transactionBuilder } from "./__shared__/transaction-builder";

let builder;

beforeEach(() => {
    builder = phantom.getBuilder().delegateResignation();

    // @ts-ignore
    global.builder = builder;
});

describe("Delegate Resignation Transaction", () => {
    transactionBuilder();

    it("should have its specific properties", () => {
        expect(builder).toHaveProperty("data.type", TransactionTypes.DelegateResignation);
        expect(builder).toHaveProperty("data.fee", feeManager.get(TransactionTypes.DelegateResignation));
    });
});
