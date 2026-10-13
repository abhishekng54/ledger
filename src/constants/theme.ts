/**
 * Theme palettes. Two themes, same shape (see Palette in types).
 * Room accent colours are defined per-room in the room modules, not here —
 * this file only carries the neutral surface palette.
 */
import type { Palette, ThemeName } from "../types";

export const DARK: Palette = {
  ink: "#0c0c0e",
  paper: "#141417",
  line: "#26262b",
  text: "#e8e6e1",
  dim: "#8a8a92",
};

export const LIGHT: Palette = {
  ink: "#f4f3ef",
  paper: "#ffffff",
  line: "#e2e0d8",
  text: "#1a1a1d",
  dim: "#73727a",
};

export const PALETTES: Record<ThemeName, Palette> = {
  dark: DARK,
  light: LIGHT,
};

export const DEFAULT_THEME: ThemeName = "dark";
