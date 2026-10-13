/**
 * Room: Taking the L.
 * A self-deprecating scoreboard of your losses. The signature stat is a weekly
 * chart that, by design, only ever looks like a market crash.
 */
import { useMemo } from "react";
import type { RoomConfig, RoomModule, RoomStatsProps } from "../types";
import { S } from "../styles/styles";
import { weeklyCounts } from "../lib/entries";
import { StatBig, ShareNote, EmptyStats } from "../components/ui/Primitives";

const WEEKS = 8;

const config: RoomConfig = {
  key: "L",
  name: "Taking the L",
  tagline: "A scoreboard of your losses. No wins allowed.",
  verb: "Take the L",
  accent: "#46A52A",
  accentDim: "#3c5e2a",
  glyph: "L",
  needsWho: false,
  placeholderWho: "",
  placeholderWhat: "What was the L? (optional)",
};

function LStats({ config, entries, palette }: RoomStatsProps) {
  const weeks = useMemo(() => weeklyCounts(entries, WEEKS), [entries]);

  if (entries.length === 0) {
    return <EmptyStats config={config} palette={palette} msg="No L's logged. Suspicious. Nobody's that good." />;
  }

  const max = Math.max(1, ...weeks);
  const thisWeek = weeks[weeks.length - 1];

  return (
    <div>
      <div style={S.statRow}>
        <StatBig n={entries.length} label="total L's taken" accent={config.accent} palette={palette} />
        <StatBig n={thisWeek} label="this week alone" accent={config.accent} palette={palette} />
      </div>

      <div style={{ ...S.boardHead, color: palette.dim }}>THE CHART (IT ONLY GOES DOWN)</div>
      <div style={{ ...S.chart, background: palette.paper, borderColor: palette.line }}>
        {weeks.map((n, i) => {
          const h = (n / max) * 100;
          return (
            <div key={i} style={S.chartCol}>
              <span style={{ ...S.chartVal, color: palette.dim }}>{n || ""}</span>
              <span style={{ ...S.chartBar, height: `${h}%`, background: config.accent, opacity: 0.35 + 0.65 * (h / 100) }} />
            </div>
          );
        })}
      </div>
      <div style={{ ...S.chartAxis, color: palette.dim }}>{WEEKS} weeks ago → now</div>

      <ShareNote palette={palette} text="Your losses, graphed like a market crash. That's the post." />
    </div>
  );
}

export const lRoom: RoomModule = { config, Stats: LStats };
