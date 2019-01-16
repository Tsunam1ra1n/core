import { app } from "@phantomchain/core-container";
import { buildPeerOptions } from "../utils";

export async function startRelay(options, version) {
    await app.setUp(version, options, {
        exclude: ["@phantomchain/core-forger"],
        options: {
            "@phantomchain/core-p2p": buildPeerOptions(options),
            "@phantomchain/core-blockchain": {
                networkStart: options.networkStart,
            },
        },
        skipPlugins: options.skipPlugins,
    });

    return app;
}

export async function startForger(options, version) {
    await app.setUp(version, options, {
        include: [
            "@phantomchain/core-event-emitter",
            "@phantomchain/core-logger",
            "@phantomchain/core-logger-winston",
            "@phantomchain/core-forger",
        ],
        options: {
            "@phantomchain/core-forger": {
                bip38: options.bip38 || process.env.PHANTOM_FORGER_BIP38,
                address: options.address,
                password: options.password || process.env.PHANTOM_FORGER_PASSWORD,
            },
        },
        skipPlugins: options.skipPlugins,
    });

    return app;
}

export async function startRelayAndForger(options, version) {
    await app.setUp(version, options, {
        options: {
            "@phantomchain/core-p2p": buildPeerOptions(options),
            "@phantomchain/core-blockchain": {
                networkStart: options.networkStart,
            },
            "@phantomchain/core-forger": {
                bip38: options.bip38 || process.env.PHANTOM_FORGER_BIP38,
                address: options.address,
                password: options.password || process.env.PHANTOM_FORGER_PASSWORD,
            },
        },
        skipPlugins: options.skipPlugins,
    });

    return app;
}
