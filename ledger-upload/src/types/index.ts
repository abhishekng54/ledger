/**
 * Core domain types for The Ledger.
 * These are the single source of truth for the app's data shapes.
 */

/** The three rooms. Add a new RoomKey here to begin scaffolding a new room. */
export type RoomKey = "receipts" | "tongue" | "L";

/** Theme options. */
export type ThemeName = "dark" | "light";

/** An ISO date string in `YYYY-MM-DD` form (no time component). */
export type ISODate = string;

/** A single logged entry. The flat record persisted on-device. */
export interface Entry {
  /** Unique id (monotonic, generated locally). */
  id: string;
  /** Which room this entry belongs to. */
  room: RoomKey;
  /** The day it is filed under (user-selectable, any date). */
  date: ISODate;
  /** Optional "who" — only The Receipts uses this. */
  who: string;
  /** Optional free-text detail / the line. */
  what: string;
  /** Creation timestamp (ms epoch) for ordering within a day. */
  ts: number;
}

/** A colour palette for one theme. */
export interface Palette {
  ink: string;
  paper: string;
  line: string;
  text: string;
  dim: string;
}

/**
 * Static configuration for a room. Pure data — no React, no logic.
 * Voice lines live separately in constants/voiceLines.ts.
 */
export interface RoomConfig {
  key: RoomKey;
  name: string;
  tagline: string;
  /** Verb on the big log button, e.g. "Take the L". */
  verb: string;
  /** Accent colour (used in both themes). */
  accent: string;
  /** Darker accent for borders/dim surfaces. */
  accentDim: string;
  /** Short monospace glyph shown on cards/headers. */
  glyph: string;
  /** Whether the room captures a "who" (The Receipts only). */
  needsWho: boolean;
  /** Placeholder for the optional "who" input. */
  placeholderWho: string;
  /** Placeholder for the optional detail input. */
  placeholderWhat: string;
}

/**
 * A room's stats renderer is given the room's entries and the active palette.
 * Each room owns how it visualises its own data.
 */
export interface RoomStatsProps {
  config: RoomConfig;
  entries: Entry[];
  palette: Palette;
}

/**
 * The full room module: static config + a stats component.
 * Registering one of these in rooms/index.ts wires a room into the app.
 */
export interface RoomModule {
  config: RoomConfig;
  Stats: React.ComponentType<RoomStatsProps>;
}
