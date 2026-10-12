/**
 * Small presentational primitives shared across room stats screens.
 */
import type { Palette, RoomConfig } from "../../types";
import { S } from "../../styles/styles";

export function StatBig({
  n,
  label,
  accent,
  palette,
}: {
  n: number;
  label: string;
  accent: string;
  palette: Palette;
}) {
  return (
    <div style={{ ...S.statBig, background: palette.paper, borderColor: palette.line }}>
      <div style={{ ...S.statNum, color: accent }}>{n}</div>
      <div style={{ ...S.statLbl, color: palette.dim }}>{label}</div>
    </div>
  );
}

export function ShareNote({ text, palette }: { text: string; palette: Palette }) {
  return <div style={{ ...S.shareNote, color: palette.dim }}>↗ {text}</div>;
}

export function EmptyStats({
  config,
  msg,
  palette,
}: {
  config: RoomConfig;
  msg: string;
  palette: Palette;
}) {
  return (
    <div style={{ ...S.empty, color: palette.dim, marginTop: 40 }}>
      <span style={{ color: config.accent, fontSize: 32, display: "block", marginBottom: 10 }}>
        {config.glyph}
      </span>
      {msg}
    </div>
  );
}
