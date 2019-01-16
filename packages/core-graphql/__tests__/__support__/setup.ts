import { app } from "@phantomchain/core-container";
import { setUpContainer } from "@phantomchain/core-test-utils/src/helpers/container";

jest.setTimeout(60000);

export const setUp = async () => {
    process.env.PHANTOM_GRAPHQL_ENABLED = "true";

    await setUpContainer({
        exclude: ["@phantomchain/core-api", "@phantomchain/core-forger"],
    });

    return app;
};

export const tearDown = async () => {
    await app.tearDown();
};
