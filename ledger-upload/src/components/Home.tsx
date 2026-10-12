import { useMemo } from "react";
import type { Entry, Palette, RoomKey, ThemeName } from "../types";
import { STRINGS } from "../constants/strings";
import { S } from "../styles/styles";
import { ROOM_LIST } from "../rooms";
import { countsByRoom } from "../lib/entries";
import { ThemeToggle } from "./ThemeToggle";
import { ExportBar } from "./ExportBar";

export function Home({
  entries,
  onPick,
  theme,
  onToggleTheme,
  palette,
}: {
  entries: Entry[];
  onPick: (room: RoomKey) => void;
  theme: ThemeName;
  onToggleTheme: () => void;
  palette: Palette;
}) {
  const counts = useMemo(() => countsByRoom(entries), [entries]);

  return (
    <>
      <div style={S.topBar}>
        <span style={{ ...S.kicker, color: palette.dim }}>{STRINGS.app.kicker}</span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} palette={palette} />
      </div>

      <header style={S.homeHead}>
        <h1 style={S.wordmark}>{STRINGS.app.wordmark}</h1>
        <div style={{ ...S.subline, color: palette.dim }}>{STRINGS.app.subline}</div>
      </header>

      <div style={S.cards}>
        {ROOM_LIST.map(({ config }) => (
          <button
            key={config.key}
            className="roomcard"
            style={{ ...S.card, background: palette.paper, borderColor: palette.line }}
            onClick={() => onPick(config.key)}
          >
            <span style={{ ...S.cardGlyph, color: config.accent }}>{config.glyph}</span>
            <span style={S.cardName}>{config.name}</span>
            <span style={{ ...S.cardTag, color: palette.dim }}>{config.tagline}</span>
            <span style={{ ...S.cardCount, color: config.accent }}>
              {counts[config.key]}
              <span style={{ ...S.cardCountLbl, color: palette.dim }}>
                {STRINGS.log.cardCountSuffix}
              </span>
            </span>
          </button>
        ))}
      </div>

      <ExportBar entries={entries} palette={palette} />
      <footer style={{ ...S.foot, color: palette.dim }}>{STRINGS.app.footer}</footer>
    </>
  );
}
