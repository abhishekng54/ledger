import { useState } from "react";
import type { ISODate, Palette } from "../types";
import { STRINGS } from "../constants/strings";
import { S } from "../styles/styles";
import { DOW, MONTHS, fromISO, toISO, todayISO } from "../lib/date";

export function Calendar({
  date,
  onPick,
  palette,
}: {
  date: ISODate;
  onPick: (date: ISODate) => void;
  palette: Palette;
}) {
  const selected = fromISO(date);
  const [cursor, setCursor] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = todayISO();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ ...S.cal, background: palette.paper, borderColor: palette.line }}>
      <div style={S.calHead}>
        <button
          className="ghost calnav"
          style={{ color: palette.text }}
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          aria-label={STRINGS.calendar.ariaPrevMonth}
        >
          ‹
        </button>
        <span style={S.calTitle}>
          {MONTHS[month]} {year}
        </span>
        <button
          className="ghost calnav"
          style={{ color: palette.text }}
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label={STRINGS.calendar.ariaNextMonth}
        >
          ›
        </button>
      </div>

      <div style={S.calGrid}>
        {DOW.map((d, i) => (
          <span key={`h${i}`} style={{ ...S.calDow, color: palette.dim }}>
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          if (d == null) return <span key={`e${i}`} />;
          const iso = toISO(new Date(year, month, d));
          const isSel = iso === date;
          const isTod = iso === today;
          return (
            <button
              key={i}
              className="calday"
              onClick={() => onPick(iso)}
              style={{
                ...S.calDay,
                color: palette.text,
                ...(isSel ? S.calSel : {}),
                ...(isTod && !isSel ? { boxShadow: "inset 0 0 0 1.5px var(--accent)" } : {}),
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      <button
        className="ghost"
        style={{ ...S.calToday, color: "var(--accent)" }}
        onClick={() => onPick(today)}
      >
        {STRINGS.calendar.jumpToday}
      </button>
    </div>
  );
}
