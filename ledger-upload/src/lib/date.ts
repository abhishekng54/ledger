/**
 * Date utilities. Pure functions, no dependencies, fully testable.
 * All dates in the app are handled as local-time `YYYY-MM-DD` strings to
 * avoid timezone drift (a log made at 11pm should stay on that calendar day).
 */
import type { ISODate } from "../types";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Single-letter day-of-week headers, Sunday-first. */
export const DOW = ["S", "M", "T", "W", "T", "F", "S"];

/** Convert a Date to a local `YYYY-MM-DD` string. */
export function toISO(d: Date): ISODate {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse a local `YYYY-MM-DD` string back into a Date at local midnight. */
export function fromISO(s: ISODate): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Today's date as an ISO string. */
export function todayISO(): ISODate {
  return toISO(new Date());
}

/** Human-friendly short form, e.g. "Jun 27, 2026". */
export function prettyDate(iso: ISODate): string {
  const d = fromISO(iso);
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Strip the time component from a Date (local midnight). */
export function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** True if the ISO date is today. */
export function isToday(iso: ISODate): boolean {
  return iso === todayISO();
}
