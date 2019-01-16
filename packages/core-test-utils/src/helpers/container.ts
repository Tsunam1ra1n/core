import { app } from "@phantomchain/core-container";
import { Container } from "@phantomchain/core-interfaces";
import "@phantomchain/core-jest-matchers";
import * as path from "path";

export async function setUpContainer(options: any): Promise<Container.IContainer> {
    await app.setUp(
        "2.0.0",
        {
            data: options.data || "~/.phantom",
            config: options.config ? options.config : path.resolve(__dirname, "../config/testnet"),
            token: options.token || "phantom",
            network: options.network || "testnet",
        },
        options,
    );
    return app;
}
