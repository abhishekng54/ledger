/**
 * Voice line selection. Picks what the room "says" after a log.
 * Pure logic so the personality behaviour is testable and consistent.
 */
import type { RoomKey } from "../types";
import { VOICE } from "../constants/voiceLines";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Choose a voice line for a log event.
 *
 * @param room        which room
 * @param count       the running count this log makes (1 = first)
 * @param who         offender name (Receipts only)
 * @param repeatChance probability of using a repeat line once count > 1
 *                     (Receipts always escalates; others are occasional)
 */
export function selectVoiceLine(
  room: RoomKey,
  count: number,
  who?: string,
  repeatChance = 1,
): string {
  const voice = VOICE[room];
  const useRepeat = count > 1 && Math.random() <= repeatChance;
  if (useRepeat) {
    return pick(voice.repeatLines(count, who));
  }
  return pick(voice.lines);
}
