/**
 * CSV / Excel export.
 *
 * Builds an RFC-4180-ish CSV from entries and exports it. On the web this
 * uses a Blob + anchor download.
 *
 * NATIVE: inside the Capacitor Android app, `downloadCsv` instead writes the
 * file via @capacitor/filesystem and opens the native share sheet
 * (@capacitor/share). The `buildCsv` function is deliberately separate from
 * `downloadCsv` so both paths reuse the exact same CSV string.
 */
import { Capacitor } from "@capacitor/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import type { Entry } from "../types";
import { CSV } from "../constants/config";
import { ROOMS } from "../rooms";
import { todayISO } from "./date";

/** Escape a single CSV cell (quote if it contains delimiters/quotes/newlines). */
function csvCell(value: unknown): string {
  const s = String(value ?? "");
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Build the CSV string for the given entries (sorted by date, then time). */
export function buildCsv(entries: Entry[]): string {
  const header = [...CSV.columns];
  const rows = entries
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.ts - b.ts)
    .map((e) => [
      ROOMS[e.room]?.config.name ?? e.room,
      e.date,
      e.who,
      e.what,
      new Date(e.ts).toISOString(),
    ]);
  return [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
}

/** The export filename for today, e.g. "ledger-2026-06-27.csv". */
export function csvFilename(): string {
  return `${CSV.filenamePrefix}-${todayISO()}.csv`;
}

/** True when a rejected share just means the user dismissed the share sheet. */
function isShareCancelled(err: unknown): boolean {
  // Capacitor rejects native calls with a plain `{ message }` object, not an Error.
  const message = (err as { message?: unknown } | null)?.message ?? err;
  return /cancel/i.test(String(message));
}

/** Write the CSV to the app cache and hand it to the native share sheet. */
async function shareCsvNative(payload: string): Promise<void> {
  const filename = csvFilename();
  // Cache is app-private (no storage permission) and is exposed to the share
  // sheet by the app's FileProvider (android/app/src/main/res/xml/file_paths.xml).
  const { uri } = await Filesystem.writeFile({
    path: filename,
    data: payload,
    directory: Directory.Cache,
    encoding: Encoding.UTF8, // without an encoding the plugin treats `data` as base64
  });
  try {
    await Share.share({ title: filename, url: uri });
  } catch (err) {
    if (!isShareCancelled(err)) throw err;
  }
}

/** Export the CSV: native share sheet in the Android app, browser download elsewhere. */
export async function downloadCsv(entries: Entry[]): Promise<void> {
  const csv = buildCsv(entries);
  const payload = CSV.useBom ? "\uFEFF" + csv : csv;

  if (Capacitor.isNativePlatform()) {
    try {
      await shareCsvNative(payload);
    } catch (err) {
      console.error("CSV export failed", err);
    }
    return;
  }

  const blob = new Blob([payload], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = csvFilename();
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
