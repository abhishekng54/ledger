/**
 * Entry data model: persistence + pure selectors.
 *
 * State management lives in the useEntries hook; this module provides the
 * framework-free pieces (load/save, id generation, and query helpers) so the
 * logic is testable and reusable.
 */
import type { Entry, ISODate, RoomKey } from "../types";
import { STORAGE_KEYS } from "../constants/config";
import { storage } from "./storage";
import { fromISO } from "./date";

/* ---------- persistence ---------- */

export function loadEntries(): Entry[] {
  try {
    const raw = storage.get(STORAGE_KEYS.entries);
    return raw ? (JSON.parse(raw) as Entry[]) : [];
  } catch {
    return [];
  }
}

export function saveEntries(entries: Entry[]): void {
  storage.set(STORAGE_KEYS.entries, JSON.stringify(entries));
}

/* ---------- id generation ---------- */

let counter = Date.now();
export function newId(): string {
  return String(counter++);
}

/** Build a new entry record (trims user strings). */
export function makeEntry(
  room: RoomKey,
  who: string,
  what: string,
  date: ISODate,
): Entry {
  return {
    id: newId(),
    room,
    date,
    who: who.trim(),
    what: what.trim(),
    ts: Date.now(),
  };
}

/* ---------- selectors (pure) ---------- */

/** Entries for a single room. */
export function byRoom(entries: Entry[], room: RoomKey): Entry[] {
  return entries.filter((e) => e.room === room);
}

/** Entries for a room on a specific day, newest first. */
export function byRoomAndDay(
  entries: Entry[],
  room: RoomKey,
  date: ISODate,
): Entry[] {
  return entries
    .filter((e) => e.room === room && e.date === date)
    .sort((a, b) => b.ts - a.ts);
}

/** Count per room across all entries. */
export function countsByRoom(entries: Entry[]): Record<RoomKey, number> {
  const counts: Record<RoomKey, number> = { receipts: 0, tongue: 0, L: 0 };
  for (const e of entries) {
    if (e.room in counts) counts[e.room]++;
  }
  return counts;
}

/** Count of entries in the same month as `ref` (default: now). */
export function countInMonth(entries: Entry[], ref: Date = new Date()): number {
  return entries.filter((e) => {
    const d = fromISO(e.date);
    return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
  }).length;
}

/**
 * Weekly counts for the last `weeks` buckets, oldest → newest.
 * Used by Taking the L's crashing chart.
 */
export function weeklyCounts(entries: Entry[], weeks = 8): number[] {
  const now = new Date();
  const buckets: number[] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const end = new Date(now);
    end.setDate(now.getDate() - w * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    const startMid = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endMid = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const count = entries.filter((e) => {
      const d = fromISO(e.date);
      return d >= startMid && d <= endMid;
    }).length;
    buckets.push(count);
  }
  return buckets;
}
