/**
 * App-wide configuration constants.
 * No user-facing copy here (see strings.ts) and no colours (see theme.ts).
 */

/** localStorage keys, namespaced to avoid collisions. */
export const STORAGE_KEYS = {
  entries: "ledger.entries",
  theme: "ledger.theme",
} as const;

/** App identity (kept in sync with capacitor.config + manifest). */
export const APP = {
  name: "Ledger",
  packageId: "io.github.abhishekng54.ledger",
} as const;

/** CSV export settings. */
export const CSV = {
  /** Column order in the exported file. */
  columns: ["account", "date", "who", "what", "logged_at"] as const,
  /** Filename prefix; the active date is appended. */
  filenamePrefix: "ledger",
  /** Prepend a UTF-8 BOM so Excel opens it with correct encoding. */
  useBom: true,
} as const;

/** Haptic feedback duration on a successful log (ms). */
export const HAPTIC_MS = 18;
