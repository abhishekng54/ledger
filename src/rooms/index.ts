/**
 * Room registry.
 *
 * This is the ONE place to wire up rooms. To add a new room:
 *   1. create rooms/<name>.tsx exporting a RoomModule
 *   2. add its RoomKey to types/index.ts
 *   3. add its voice to constants/voiceLines.ts
 *   4. register it below
 * Nothing else in the app needs to change — Home, Room, and stats dispatch
 * all read from this registry.
 */
import type { RoomKey, RoomModule } from "../types";
import { receiptsRoom } from "./receipts";
import { tongueRoom } from "./tongue";
import { lRoom } from "./L";

export const ROOMS: Record<RoomKey, RoomModule> = {
  receipts: receiptsRoom,
  tongue: tongueRoom,
  L: lRoom,
};

/** Stable display order for the home screen. */
export const ROOM_ORDER: RoomKey[] = ["receipts", "tongue", "L"];

/** Convenience: the room modules in display order. */
export const ROOM_LIST: RoomModule[] = ROOM_ORDER.map((k) => ROOMS[k]);
