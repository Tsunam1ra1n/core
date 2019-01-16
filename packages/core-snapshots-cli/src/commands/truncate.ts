import { app } from "@phantomchain/core-container";
import { SnapshotManager } from "@phantomchain/core-snapshots";

export async function truncateSnapshot(options) {
    const snapshotManager = app.resolvePlugin<SnapshotManager>("snapshots");
    await snapshotManager.truncateChain();
}
