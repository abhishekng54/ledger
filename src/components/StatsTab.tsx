import type { Entry, Palette, RoomKey } from "../types";
import { ROOMS } from "../rooms";

/**
 * Dispatches to the active room's own Stats component. Each room owns how it
 * visualises its data, so this stays a thin router with no per-room branching.
 */
export function StatsTab({
  roomKey,
  entries,
  palette,
}: {
  roomKey: RoomKey;
  entries: Entry[];
  palette: Palette;
}) {
  const { config, Stats } = ROOMS[roomKey];
  return <Stats config={config} entries={entries} palette={palette} />;
}
