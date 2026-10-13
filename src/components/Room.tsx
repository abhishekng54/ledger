import { useMemo, useState, type CSSProperties } from "react";
import type { Entry, ISODate, Palette, RoomKey, ThemeName } from "../types";
import { STRINGS } from "../constants/strings";
import { S } from "../styles/styles";
import { ROOMS } from "../rooms";
import { byRoomAndDay } from "../lib/entries";
import { ThemeToggle } from "./ThemeToggle";
import { LogTab } from "./LogTab";
import { StatsTab } from "./StatsTab";

type Tab = "log" | "stats";

export function Room({
  roomKey,
  entries,
  date,
  setDate,
  onBack,
  onAdd,
  onDelete,
  theme,
  onToggleTheme,
  palette,
}: {
  roomKey: RoomKey;
  entries: Entry[];
  date: ISODate;
  setDate: (d: ISODate) => void;
  onBack: () => void;
  onAdd: (room: RoomKey, who: string, what: string, date: ISODate) => void;
  onDelete: (id: string) => void;
  theme: ThemeName;
  onToggleTheme: () => void;
  palette: Palette;
}) {
  const { config } = ROOMS[roomKey];
  const [tab, setTab] = useState<Tab>("log");

  const roomEntries = useMemo(
    () => entries.filter((e) => e.room === roomKey),
    [entries, roomKey],
  );
  const dayEntries = useMemo(
    () => byRoomAndDay(entries, roomKey, date),
    [entries, roomKey, date],
  );

  // Expose the room accent as a CSS variable for pseudo-state styling.
  const accentVars = {
    "--accent": config.accent,
    "--accentDim": config.accentDim,
  } as CSSProperties;

  return (
    <div style={accentVars}>
      <div style={S.topBar}>
        <button className="ghost" style={{ ...S.back, color: palette.dim }} onClick={onBack}>
          {STRINGS.nav.back}
        </button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} palette={palette} />
      </div>

      <header style={S.roomHead}>
        <div style={{ ...S.roomGlyph, color: config.accent }}>{config.glyph}</div>
        <h2 style={S.roomName}>{config.name}</h2>
      </header>

      <div style={{ ...S.tabs, borderColor: palette.line }}>
        <button
          className={`tab ${tab === "log" ? "on" : ""}`}
          style={{ ...S.tab, color: tab === "log" ? palette.text : palette.dim }}
          onClick={() => setTab("log")}
        >
          {STRINGS.nav.tabLog}
        </button>
        <button
          className={`tab ${tab === "stats" ? "on" : ""}`}
          style={{ ...S.tab, color: tab === "stats" ? palette.text : palette.dim }}
          onClick={() => setTab("stats")}
        >
          {STRINGS.nav.tabStats}
        </button>
      </div>

      {tab === "log" ? (
        <LogTab
          config={config}
          date={date}
          setDate={setDate}
          dayEntries={dayEntries}
          onAdd={onAdd}
          onDelete={onDelete}
          palette={palette}
        />
      ) : (
        <StatsTab roomKey={roomKey} entries={roomEntries} palette={palette} />
      )}
    </div>
  );
}
