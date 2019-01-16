import msgpack from "msgpack-lite";
import * as phantomEncoders from "./phantom";

export class PhantomCodec {
    get blocks() {
        const codec: any = msgpack.createCodec();
        codec.addExtPacker(0x3f, Object, phantomEncoders.blockEncode);
        codec.addExtUnpacker(0x3f, phantomEncoders.blockDecode);

        return codec;
    }

    get transactions() {
        const codec: any = msgpack.createCodec();
        codec.addExtPacker(0x4f, Object, phantomEncoders.transactionEncode);
        codec.addExtUnpacker(0x4f, phantomEncoders.transactionDecode);

        return codec;
    }
}
