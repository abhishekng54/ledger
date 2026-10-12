/**
 * useTheme — owns the active theme, persists it, and resolves the palette.
 */
import { useCallback, useEffect, useState } from "react";
import type { Palette, ThemeName } from "../types";
import { STORAGE_KEYS } from "../constants/config";
import { PALETTES, DEFAULT_THEME } from "../constants/theme";
import { storage } from "../lib/storage";

export interface UseTheme {
  theme: ThemeName;
  palette: Palette;
  toggleTheme: () => void;
}

function readInitialTheme(): ThemeName {
  const stored = storage.get(STORAGE_KEYS.theme);
  return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

export function useTheme(): UseTheme {
  const [theme, setTheme] = useState<ThemeName>(readInitialTheme);

  useEffect(() => {
    storage.set(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, palette: PALETTES[theme], toggleTheme };
}
