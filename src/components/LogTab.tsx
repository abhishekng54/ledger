import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { Entry, ISODate, Palette, RoomConfig } from "../types";
import { STRINGS } from "../constants/strings";
import { HAPTIC_MS } from "../constants/config";
import { S } from "../styles/styles";
import { isToday, prettyDate } from "../lib/date";
import { selectVoiceLine } from "../lib/voice";
import { Calendar } from "./Calendar";

interface Stub {
  line: string;
  t: number;
}

export function LogTab({
  config,
  date,
  setDate,
  dayEntries,
  onAdd,
  onDelete,
  palette,
}: {
  config: RoomConfig;
  date: ISODate;
  setDate: (d: ISODate) => void;
  dayEntries: Entry[];
  onAdd: (room: RoomConfig["key"], who: string, what: string, date: ISODate) => void;
  onDelete: (id: string) => void;
  palette: Palette;
}) {
  const [who, setWho] = useState("");
  const [what, setWhat] = useState("");
  const [stub, setStub] = useState<Stub | null>(null);
  const [showCal, setShowCal] = useState(false);
  const [bump, setBump] = useState(0);
  const whoRef = useRef<HTMLInputElement>(null);

  const today = isToday(date);
  const dayCount = dayEntries.length;

  const fire = () => {
    // Receipts requires a "who"; nudge focus instead of logging an empty offender.
    if (config.needsWho && !who.trim()) {
      whoRef.current?.focus();
      return;
    }

    let line: string;
    if (config.needsWho) {
      const priorForWho = dayEntries.filter(
        (e) => e.who.toLowerCase() === who.trim().toLowerCase(),
      ).length;
      line = selectVoiceLine(config.key, priorForWho + 1, who.trim(), 1);
    } else {
      // Others escalate only sometimes, so the joke doesn't get stale.
      line = selectVoiceLine(config.key, dayCount + 1, undefined, 0.55);
    }

    onAdd(config.key, who, what, date);
    setStub({ line, t: Date.now() });
    setBump((b) => b + 1);
    setWho("");
    setWhat("");
    navigator.vibrate?.(HAPTIC_MS);
  };

  return (
    <div>
      {/* Date selector — clearly tappable, opens the calendar */}
      <button
        className="ghost datebtn"
        style={{ ...S.dateBtn, background: palette.paper, borderColor: showCal ? config.accent : palette.line }}
        onClick={() => setShowCal((v) => !v)}
      >
        <span style={{ ...S.calIcon, borderColor: config.accent, color: config.accent }} aria-hidden>
          ▦
        </span>
        <span style={S.dateTextWrap}>
          <span style={{ ...S.dateLbl, color: palette.dim }}>
            {today ? STRINGS.calendar.labelToday : STRINGS.calendar.labelOtherDay}
          </span>
          <span style={S.dateVal}>{prettyDate(date)}</span>
        </span>
        <span style={{ ...S.dateCaret, color: config.accent }}>{showCal ? "▴" : "▾"}</span>
      </button>
      {showCal && (
        <Calendar
          date={date}
          palette={palette}
          onPick={(d) => {
            setDate(d);
            setShowCal(false);
            setStub(null);
          }}
        />
      )}

      {/* The big one-tap button */}
      <div style={S.bigWrap}>
        <button key={bump} className="bigbtn" style={S.bigBtn} onClick={fire}>
          <span style={S.bigPlus}>+</span>
          <span style={S.bigVerb}>{config.verb}</span>
        </button>
        <div style={{ ...S.bigHint, color: palette.dim }}>
          {today ? STRINGS.log.hintToday : STRINGS.log.hintOtherDay(prettyDate(date))}
        </div>
      </div>

      {/* Optional details (after the tap — never blocks logging) */}
      <div style={S.fields}>
        {config.needsWho && (
          <input
            ref={whoRef}
            className="fld"
            style={{ ...S.input, background: palette.paper, borderColor: palette.line, color: palette.text }}
            value={who}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWho(e.target.value)}
            placeholder={config.placeholderWho}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && fire()}
          />
        )}
        <input
          className="fld"
          style={{ ...S.input, background: palette.paper, borderColor: palette.line, color: palette.text }}
          value={what}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWhat(e.target.value)}
          placeholder={config.placeholderWhat}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && fire()}
        />
      </div>

      {/* Voice line */}
      {stub && (
        <div key={stub.t} className="stub" style={{ ...S.stub, borderColor: palette.line }}>
          “{stub.line}”
        </div>
      )}

      {/* The day's log */}
      <div style={S.logHeadRow}>
        <span style={{ ...S.logHead, color: palette.dim }}>{prettyDate(date)}</span>
        <span style={{ ...S.logCount, color: palette.dim }}>
          {dayCount} {dayCount === 1 ? STRINGS.log.entryOne : STRINGS.log.entryMany}
        </span>
      </div>
      {dayEntries.length === 0 ? (
        <div style={{ ...S.empty, color: palette.dim }}>
          {today ? STRINGS.log.emptyToday : STRINGS.log.emptyPast}
        </div>
      ) : (
        <ul style={S.list}>
          {dayEntries.map((e) => (
            <li key={e.id} style={{ ...S.row, background: palette.paper }}>
              <span style={{ ...S.rowBar, background: config.accent }} />
              <span style={S.rowBody}>
                {e.who && <b style={{ color: config.accent }}>{e.who}</b>}
                {e.who && e.what && " — "}
                {e.what || (!e.who && <i style={{ color: palette.dim }}>{STRINGS.log.detailFallback}</i>)}
              </span>
              <button
                className="ghost del"
                style={{ ...S.del, color: palette.dim }}
                onClick={() => onDelete(e.id)}
                aria-label="Delete entry"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
