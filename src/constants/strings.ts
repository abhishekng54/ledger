/**
 * All user-facing UI copy (chrome, labels, hints, empty states).
 *
 * This intentionally EXCLUDES the comedic "voice" lines that print after a
 * log — those live in voiceLines.ts because they're iterated on far more
 * often and may be authored by someone else. Keep that separation.
 */

export const STRINGS = {
  app: {
    wordmark: "LEDGER",
    subline: "Your emotional bookkeeping. Three accounts open.",
    kicker: "NO LOGIN \u00B7 OFFLINE \u00B7 ON THIS DEVICE",
    footer:
      "Works offline. Nothing leaves this device \u2014 no account, no internet, no machine reading it.",
  },

  nav: {
    back: "\u2039 All accounts",
    tabLog: "Log",
    tabStats: "The damage",
  },

  theme: {
    toLight: "\u2600 Light",
    toDark: "\u263E Dark",
    ariaToggle: "Toggle light or dark theme",
  },

  log: {
    hintToday: "Tap to log. Details optional.",
    /** Receives the pretty date string. */
    hintOtherDay: (date: string) => `Logging to ${date}.`,
    cardCountSuffix: " on the books",
    detailFallback: "logged, no comment",
    entryOne: "entry",
    entryMany: "entries",
    emptyToday: "Nothing on the books for this day. Yet.",
    emptyPast: "Nothing on the books for this day.",
  },

  calendar: {
    labelToday: "TODAY \u00B7 tap to pick another day",
    labelOtherDay: "VIEWING ANOTHER DAY",
    jumpToday: "Jump to today",
    ariaPrevMonth: "Previous month",
    ariaNextMonth: "Next month",
  },

  export: {
    button: "\u2B07 Export to CSV / Excel",
    /** Receives the total entry count. */
    meta: (count: number) => `${count} total entries \u00B7 stays on device`,
  },
} as const;
