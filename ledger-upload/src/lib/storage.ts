/**
 * Offline-safe key/value storage.
 *
 * Wraps localStorage so the app works on-device AND degrades gracefully in
 * sandboxes where localStorage may be unavailable or throw (it falls back to
 * an in-memory map). No network, ever.
 */

const memory = new Map<string, string>();

export const storage = {
  get(key: string): string | null {
    try {
      const v = window.localStorage.getItem(key);
      return v ?? memory.get(key) ?? null;
    } catch {
      return memory.get(key) ?? null;
    }
  },

  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore — fall through to memory */
    }
    memory.set(key, value);
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    memory.delete(key);
  },
};
