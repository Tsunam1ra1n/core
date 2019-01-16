import { app } from "@phantomchain/core-container";
import { setUpContainer } from "@phantomchain/core-test-utils/src/helpers/container";

jest.setTimeout(60000);

export async function setUp() {
    // @ts-ignore
    process.env.PHANTOM_JSON_RPC_ENABLED = true;

    return setUpContainer({
        exclude: ["@phantomchain/core-webhooks", "@phantomchain/core-graphql", "@phantomchain/core-forger"],
    });
}

export async function tearDown() {
    return app.tearDown();
}
