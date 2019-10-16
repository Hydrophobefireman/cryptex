import entries from "@hydrophobefireman/j-utils/@build-modern/src/modules/Object/entries";
export const WORKER_COMMANDS = { clear: "CLEAR", file: "FILE", error: "ERROR" };
export const WORKER_RESPONSES = {};
entries(WORKER_COMMANDS).map(([x, y]) => (WORKER_RESPONSES[x] = `ack-${y}`));
