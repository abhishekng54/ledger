/**
 * Room: Bit My Tongue.
 * A monument to everything you didn't say. Stats surface a "Vault" of the
 * lines you held back, plus a monk-tier monthly restraint count.
 */
import { useMemo } from "react";
import type { RoomConfig, RoomModule, RoomStatsProps } from "../types";
import { S } from "../styles/styles";
import { prettyDate } from "../lib/date";
import { countInMonth } from "../lib/entries";
import { StatBig, ShareNote, EmptyStats } from "../components/ui/Primitives";

const config: RoomConfig = {
  key: "tongue",
  name: "Bit My Tongue",
  tagline: "A monument to everything you didn't say.",
  verb: "I held it",
  accent: "#2E86FF",
  accentDim: "#234b6e",
  glyph: "HELD",
  needsWho: false,
  placeholderWho: "",
  placeholderWhat: "What you would've said…",
};

function TongueStats({ config, entries, palette }: RoomStatsProps) {
  const vault = useMemo(
    () => entries.filter((e) => e.what).sort((a, b) => b.ts - a.ts),
    [entries],
  );
  const monthCount = useMemo(() => countInMonth(entries), [entries]);

  if (entries.length === 0) {
    return <EmptyStats config={config} palette={palette} msg="Nothing held back yet. Bold. Reckless, even." />;
  }

  return (
    <div>
      <div style={S.statRow}>
        <StatBig n={entries.length} label="tongues bitten" accent={config.accent} palette={palette} />
        <StatBig n={monthCount} label="this month (monk-tier)" accent={config.accent} palette={palette} />
      </div>

      <div style={{ ...S.boardHead, color: palette.dim }}>THE VAULT — LINES YOU NEVER DEPLOYED</div>
      {vault.length === 0 ? (
        <div style={{ ...S.empty, color: palette.dim }}>
          You held your tongue but kept no record of the burn. Restraint within restraint.
        </div>
      ) : (
        <ul style={S.vault}>
          {vault.map((e) => (
            <li key={e.id} style={{ ...S.vaultRow, background: palette.paper, borderColor: config.accentDim }}>
              <span style={S.vaultQuote}>“{e.what}”</span>
              <span style={{ ...S.vaultDate, color: palette.dim }}>{prettyDate(e.date)} · unsaid</span>
            </li>
          ))}
        </ul>
      )}

      <ShareNote palette={palette} text="The funniest things you were classy enough not to say." />
    </div>
  );
}

export const tongueRoom: RoomModule = { config, Stats: TongueStats };
