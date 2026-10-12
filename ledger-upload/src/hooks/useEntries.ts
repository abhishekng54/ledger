/**
 * useEntries — owns the entries collection, its persistence, and the actions
 * to mutate it. Components consume this rather than touching storage directly.
 */
import { useCallback, useEffect, useState } from "react";
import type { Entry, ISODate, RoomKey } from "../types";
import { loadEntries, saveEntries, makeEntry } from "../lib/entries";

export interface UseEntries {
  entries: Entry[];
  addEntry: (room: RoomKey, who: string, what: string, date: ISODate) => void;
  deleteEntry: (id: string) => void;
}

export function useEntries(): UseEntries {
  const [entries, setEntries] = useState<Entry[]>(loadEntries);

  // Persist on every change. Storage is offline + synchronous-safe.
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const addEntry = useCallback(
    (room: RoomKey, who: string, what: string, date: ISODate) => {
      setEntries((prev) => [...prev, makeEntry(room, who, what, date)]);
    },
    [],
  );

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, addEntry, deleteEntry };
}
