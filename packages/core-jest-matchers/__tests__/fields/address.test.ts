import "../../src/fields/address";

describe(".toBePhantomAddress", () => {
    test("passes when given a valid address", () => {
        expect("PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX").toBePhantomAddress();
    });

    test("fails when not given a valid address", () => {
        expect("invalid-address").not.toBePhantomAddress();
    });
});
