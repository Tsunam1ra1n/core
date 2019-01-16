import { resolve } from "path";

export const opts = {
    data: "~/.phantom",
    config: resolve(__dirname, "./config"),
    token: "phantom",
    network: "testnet",
    skipPlugins: true,
};

export const version = "2.0.0";
