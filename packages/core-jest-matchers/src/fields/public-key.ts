import { crypto } from "@phantomchain/crypto";

export {};

declare global {
    namespace jest {
        // tslint:disable-next-line:interface-name
        interface Matchers<R> {
            toBePhantomPublicKey(): R;
        }
    }
}

expect.extend({
    toBePhantomPublicKey: received => {
        return {
            message: () => "Expected value to be a valid public key",
            pass: crypto.validatePublicKey(received),
        };
    },
});
