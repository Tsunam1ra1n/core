import { app } from "@phantomchain/core-container";
import { Blockchain } from "@phantomchain/core-interfaces";
import { bignumify } from "@phantomchain/core-utils";
import { crypto, models } from "@phantomchain/crypto";

export function transformTransactionLegacy(model) {
    const config = app.getConfig();
    const blockchain = app.resolvePlugin<Blockchain.IBlockchain>("blockchain");

    const data: any = new models.Transaction(model.serialized.toString("hex"));

    return {
        id: data.id,
        blockid: model.blockId,
        type: data.type,
        timestamp: data.timestamp,
        amount: +bignumify(data.amount).toFixed(),
        fee: +bignumify(data.fee).toFixed(),
        recipientId: data.recipientId,
        senderId: crypto.getAddress(data.senderPublicKey, config.get("network.pubKeyHash")),
        senderPublicKey: data.senderPublicKey,
        vendorField: data.vendorField,
        signature: data.signature,
        signSignature: data.signSignature,
        signatures: data.signatures,
        asset: data.asset || {},
        confirmations: model.block ? blockchain.getLastBlock().data.height - model.block.height : 0,
    };
}
