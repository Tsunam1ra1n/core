import "jest-extended";
import Joi from "joi";
import { validator } from "../../src/validation";

beforeEach(() => {
    validator.__reset();
});

describe("Validator", () => {
    describe("passes", () => {
        it("should be true", () => {
            validator.results = {
                passes: true,
            };

            expect(validator.passes()).toBeTrue();
        });

        it("should be false", () => {
            validator.results = {
                passes: false,
            };

            expect(validator.passes()).toBeFalse();
        });
    });

    describe("fails", () => {
        it("should be true", () => {
            validator.results = {
                fails: true,
            };

            expect(validator.fails()).toBeTrue();
        });

        it("should be false", () => {
            validator.results = {
                fails: false,
            };

            expect(validator.fails()).toBeFalse();
        });
    });

    describe("validated", () => {
        it("should be true", () => {
            validator.results = {
                data: {
                    key: "value",
                },
            };

            expect(validator.validated()).toHaveProperty("key", "value");
        });

        it("should be false", () => {
            validator.results = {
                data: {
                    invalidKey: "value",
                },
            };

            expect(validator.validated()).not.toHaveProperty("key", "value");
        });
    });

    describe("extend", () => {
        it("should add the given method", () => {
            expect(validator.rules).not.toHaveProperty("fake");

            validator.extend("fake", "news");

            expect(validator.rules).toHaveProperty("fake");
        });
    });

    describe("__validateWithRule", () => {
        it("should be true", () => {
            validator.__validateWithRule("PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX", "address");

            expect(validator.passes()).toBeTrue();
        });

        it("should be false", () => {
            validator.__validateWithRule("_PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX_", "address");

            expect(validator.passes()).toBeFalse();
        });
    });

    describe("__validateWithFunction", () => {
        it("should be true", () => {
            validator.__validateWithFunction("PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX", value => ({
                data: value,
                passes: value.length === 34,
                fails: value.length !== 34,
            }));

            expect(validator.passes()).toBeTrue();
        });

        it("should be false", () => {
            validator.__validateWithFunction("_PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX_", value => ({
                data: value,
                passes: value.length === 34,
                fails: value.length !== 34,
            }));

            expect(validator.passes()).toBeFalse();
        });
    });

    describe("__validateWithJoi", () => {
        it("should be true", () => {
            validator.__validateWithJoi(
                "PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX",
                Joi.string()
                    .alphanum()
                    .length(34)
                    .required(),
            );

            expect(validator.passes()).toBeTrue();
        });

        it("should be false", () => {
            validator.__validateWithJoi(
                "_PCTBQ2z5gmUHEw6n8Ufrw1YSyt3orJu1QX_",
                Joi.string()
                    .alphanum()
                    .length(34)
                    .required(),
            );

            expect(validator.passes()).toBeFalse();
        });
    });

    describe("__reset", () => {
        it("should be empty", () => {
            validator.results = {
                key: "value",
            };

            expect(validator.results).not.toBeNull();

            validator.__reset();

            expect(validator.results).toBeNull();
        });
    });
});
