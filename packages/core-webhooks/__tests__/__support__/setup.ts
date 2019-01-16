import { app } from "@phantomchain/core-container";
import { setUpContainer } from "@phantomchain/core-test-utils/src/helpers/container";
import { database } from "../../src/database";
import { webhookManager } from "../../src/manager";
import { startServer } from "../../src/server";

jest.setTimeout(60000);

async function setUp() {
    process.env.PHANTOM_WEBHOOKS_ENABLED = "true";

    await setUpContainer({
        exclude: ["@phantomchain/core-api", "@phantomchain/core-graphql", "@phantomchain/core-forger"],
    });

    await database.setUp({
        dialect: "sqlite",
        storage: `${process.env.PHANTOM_PATH_DATA}/database/webhooks.sqlite`,
        logging: process.env.PHANTOM_DB_LOGGING,
    });

    await webhookManager.setUp();

    await startServer({
        enabled: false,
        host: process.env.PHANTOM_WEBHOOKS_HOST || "0.0.0.0",
        port: process.env.PHANTOM_WEBHOOKS_PORT || 4004,
        whitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
        pagination: {
            limit: 100,
            include: ["/api/webhooks"],
        },
    });
}

async function tearDown() {
    await app.tearDown();
}

export { setUp, tearDown };
