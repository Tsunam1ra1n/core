import { Engine } from "../engine";

export const username = attributes => {
    const { error, value } = Engine.validate(attributes, Engine.joi.phantomUsername());

    return {
        data: value,
        errors: error ? error.details : null,
        passes: !error,
        fails: error,
    };
};
