import { useState } from "react";
import type { RoomKey } from "./types";
import { S, globalCss } from "./styles/styles";
import { useEntries } from "./hooks/useEntries";
import { useTheme } from "./hooks/useTheme";
import { todayISO } from "./lib/date";
import { Home } from "./components/Home";
import { Room } from "./components/Room";

/**
 * Root component. Keeps navigation + active-date state and delegates data and
 * theme concerns to hooks. `room === null` means the home screen.
 */
export default function Ledger() {
  const { entries, addEntry, deleteEntry } = useEntries();
  const { theme, palette, toggleTheme } = useTheme();

  const [room, setRoom] = useState<RoomKey | null>(null);
  const [date, setDate] = useState(todayISO());

  const openRoom = (r: RoomKey) => {
    setRoom(r);
    setDate(todayISO());
  };

  return (
    <div style={{ ...S.app, background: palette.ink, color: palette.text }} data-theme={theme}>
      <style>{globalCss(palette)}</style>
      <div style={S.shell}>
        {room === null ? (
          <Home
            entries={entries}
            onPick={openRoom}
            theme={theme}
            onToggleTheme={toggleTheme}
            palette={palette}
          />
        ) : (
          <Room
            roomKey={room}
            entries={entries}
            date={date}
            setDate={setDate}
            onBack={() => setRoom(null)}
            onAdd={addEntry}
            onDelete={deleteEntry}
            theme={theme}
            onToggleTheme={toggleTheme}
            palette={palette}
          />
        )}
      </div>
    </div>
  );
}
