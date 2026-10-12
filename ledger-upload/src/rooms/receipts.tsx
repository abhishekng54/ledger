/**
 * Room: The Receipts.
 * A petty accountant for the wrongs done to you. The only room that captures
 * a "who", which powers the Top Offenders leaderboard and Villain of the Month.
 */
import { useMemo } from "react";
import type { RoomConfig, RoomModule, RoomStatsProps } from "../types";
import { S } from "../styles/styles";
import { StatBig, ShareNote, EmptyStats } from "../components/ui/Primitives";

const config: RoomConfig = {
  key: "receipts",
  name: "The Receipts",
  tagline: "We keep the receipts so you don't have to.",
  verb: "Log it",
  accent: "#FF5A3C",
  accentDim: "#7a2e22",
  glyph: "RCPT",
  needsWho: true,
  placeholderWho: "Who did you dirty?",
  placeholderWhat: "What'd they do? (one line)",
};

function ReceiptsStats({ config, entries, palette }: RoomStatsProps) {
  const offenders = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of entries) {
      const key = e.who || "(unnamed)";
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [entries]);

  if (entries.length === 0) {
    return <EmptyStats config={config} palette={palette} msg="No receipts yet. Someone will earn it." />;
  }

  const villain = offenders[0];
  const max = villain ? villain[1] : 1;

  return (
    <div>
      <div style={S.statRow}>
        <StatBig n={entries.length} label="receipts on file" accent={config.accent} palette={palette} />
        <StatBig n={offenders.length} label="offenders tracked" accent={config.accent} palette={palette} />
      </div>

      {villain && (
        <div style={{ ...S.villain, background: palette.paper, borderColor: config.accentDim }}>
          <span style={{ ...S.villainLbl, color: palette.dim }}>VILLAIN OF THE MONTH</span>
          <span style={{ ...S.villainName, color: config.accent }}>{villain[0]}</span>
          <span style={{ ...S.villainSub, color: palette.dim }}>
            {villain[1]} documented offense{villain[1] > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div style={{ ...S.boardHead, color: palette.dim }}>TOP OFFENDERS</div>
      <ul style={S.board}>
        {offenders.map(([who, n], i) => (
          <li key={who} style={S.boardRow}>
            <span style={{ ...S.rank, color: palette.dim }}>{i + 1}</span>
            <span style={S.boardName}>{who}</span>
            <span style={{ ...S.barTrack, background: palette.line }}>
              <span style={{ ...S.barFill, width: `${(n / max) * 100}%`, background: config.accent }} />
            </span>
            <span style={{ ...S.boardN, color: config.accent }}>{n}</span>
          </li>
        ))}
      </ul>

      <ShareNote palette={palette} text="Screenshot the leaderboard. Blur the names. Obviously." />
    </div>
  );
}

export const receiptsRoom: RoomModule = { config, Stats: ReceiptsStats };
