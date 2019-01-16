import "jest-extended";

import { address } from "../../../src/validation/rules/address";

describe("Address Rule", () => {
    it("should be true", () => {
        expect(address("PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX").passes).toBeTrue();
    });

    it("should be false", () => {
        expect(address("_PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX_").passes).toBeFalse();
    });
});
