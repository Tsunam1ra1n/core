import { LiteCodec } from "./lite-codec";
import { PhantomCodec } from "./phantom-codec";

export function getCodec(codec) {
    switch (codec) {
        case "phantom":
            return new PhantomCodec();
        case "lite":
            return new LiteCodec();
        case "msgpack":
            return null;
        default:
            return new LiteCodec();
    }
}
