/**
 * useTheme — owns the active theme, persists it, and resolves the palette.
 *
 * Until the user taps the toggle, the theme follows the device (and tracks it
 * live if the device switches). Tapping the toggle saves that choice, and the
 * saved choice wins from then on, including after the app is closed.
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

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readSavedTheme(): ThemeName | null {
  const stored = storage.get(STORAGE_KEYS.theme);
  return stored === "light" || stored === "dark" ? stored : null;
}

function readDeviceTheme(): ThemeName {
  if (typeof window.matchMedia !== "function") return DEFAULT_THEME;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function useTheme(): UseTheme {
  const [saved, setSaved] = useState<ThemeName | null>(readSavedTheme);
  const [device, setDevice] = useState<ThemeName>(readDeviceTheme);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => setDevice(e.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const theme = saved ?? device;

  const toggleTheme = useCallback(() => {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    storage.set(STORAGE_KEYS.theme, next);
    setSaved(next);
  }, [theme]);

  return { theme, palette: PALETTES[theme], toggleTheme };
}
