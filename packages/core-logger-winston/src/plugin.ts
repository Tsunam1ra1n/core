import { Container } from "@phantomchain/core-interfaces";
import { LogManager } from "@phantomchain/core-logger";
import { defaults } from "./defaults";
import { WinstonLogger } from "./driver";

export const plugin: Container.PluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "logger",
    extends: "@phantomchain/core-logger",
    async register(container: Container.IContainer, options) {
        const logManager: LogManager = container.resolvePlugin("logManager");
        await logManager.makeDriver(new WinstonLogger(options));

        return logManager.driver();
    },
};
