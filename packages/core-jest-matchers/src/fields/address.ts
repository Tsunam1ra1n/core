import { crypto } from "@phantomchain/crypto";

export {};

declare global {
    namespace jest {
        // tslint:disable-next-line:interface-name
        interface Matchers<R> {
            toBePhantomAddress(): R;
        }
    }
}

expect.extend({
    toBePhantomAddress: (received, argument) => {
        return {
            message: () => "Expected value to be a valid address",
            pass: crypto.validateAddress(received, argument),
        };
    },
});
