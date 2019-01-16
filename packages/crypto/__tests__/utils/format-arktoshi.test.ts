import "jest-extended";

import { PHANTOMTOSHI } from "../../src/constants";
import { Bignum, formatPhantomtoshi } from "../../src/utils";

describe("Format Phantomtoshi", () => {
    it("should format phantomtoshis", () => {
        expect(formatPhantomtoshi(PHANTOMTOSHI)).toBe("1 Dⓟ");
        expect(formatPhantomtoshi(0.1 * PHANTOMTOSHI)).toBe("0.1 Dⓟ");
        expect(formatPhantomtoshi((0.1 * PHANTOMTOSHI).toString())).toBe("0.1 Dⓟ");
        expect(formatPhantomtoshi(new Bignum(10))).toBe("0.0000001 Dⓟ");
        expect(formatPhantomtoshi(new Bignum(PHANTOMTOSHI + 10012))).toBe("1.00010012 Dⓟ");
    });
});
