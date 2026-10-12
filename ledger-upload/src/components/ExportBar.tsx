import type { Entry, Palette } from "../types";
import { STRINGS } from "../constants/strings";
import { S } from "../styles/styles";
import { downloadCsv } from "../lib/csv";

export function ExportBar({ entries, palette }: { entries: Entry[]; palette: Palette }) {
  return (
    <div style={S.exportBar}>
      <button
        className="ghost exp"
        style={{ ...S.expBtn, background: palette.paper, borderColor: palette.line, color: palette.text }}
        onClick={() => downloadCsv(entries)}
        disabled={entries.length === 0}
      >
        {STRINGS.export.button}
      </button>
      <span style={{ ...S.expMeta, color: palette.dim }}>{STRINGS.export.meta(entries.length)}</span>
    </div>
  );
}
