import { app } from "@phantomchain/core-container";
import { setUpContainer } from "@phantomchain/core-test-utils/src/helpers/container";

jest.setTimeout(60000);

export const setUp = async () => {
    return await setUpContainer({
        exit: "@phantomchain/core-blockchain",
        exclude: ["@phantomchain/core-transaction-pool"],
    });
};

export const setUpFull = async () => {
    return await setUpContainer({
        exit: "@phantomchain/core-blockchain",
    });
};

export const tearDown = async () => {
    await app.tearDown();
};
