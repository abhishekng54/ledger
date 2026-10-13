/**
 * Style tokens.
 *
 * Inline style objects keep components self-contained and avoid a CSS build
 * step. Colours are injected at render time from the active Palette (so these
 * objects stay palette-agnostic). Pseudo-states (:hover, :focus, animations)
 * that inline styles can't express live in the `globalCss` factory below.
 */
import type { CSSProperties } from "react";
import type { Palette } from "../types";

const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const sans = "'Inter','Helvetica Neue',Arial,sans-serif";

export const S: Record<string, CSSProperties> = {
  app: { minHeight: "100%", fontFamily: sans, padding: "0 0 40px", transition: "background .2s ease, color .2s ease" },
  shell: { maxWidth: 480, margin: "0 auto", padding: "16px 18px 0" },

  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 6, minHeight: 32 },
  kicker: { fontSize: 9.5, letterSpacing: "0.2em", fontFamily: mono },
  themeBtn: { fontSize: 11.5, fontFamily: mono, background: "none", border: "1px solid", borderRadius: 20, padding: "5px 12px", cursor: "pointer", letterSpacing: "0.04em" },

  homeHead: { textAlign: "center", padding: "20px 0 8px" },
  wordmark: { fontSize: 46, fontWeight: 800, letterSpacing: "-0.02em", margin: "6px 0 6px", lineHeight: 1 },
  subline: { fontSize: 13.5 },

  cards: { display: "flex", flexDirection: "column", gap: 12, marginTop: 22 },
  card: { textAlign: "left", border: "1px solid", borderRadius: 14, padding: "18px 18px 16px", display: "flex", flexDirection: "column", gap: 3, cursor: "pointer", position: "relative", color: "inherit" },
  cardGlyph: { fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", fontWeight: 700 },
  cardName: { fontSize: 22, fontWeight: 750, letterSpacing: "-0.01em" },
  cardTag: { fontSize: 12.5, lineHeight: 1.35 },
  cardCount: { fontFamily: mono, fontSize: 30, fontWeight: 700, marginTop: 8, lineHeight: 1 },
  cardCountLbl: { fontSize: 11, fontFamily: sans, fontWeight: 400, letterSpacing: 0 },

  exportBar: { marginTop: 22, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" },
  expBtn: { fontFamily: mono, fontSize: 13, border: "1px solid", padding: "11px 16px", borderRadius: 10, width: "100%", cursor: "pointer", letterSpacing: "0.04em" },
  expMeta: { fontSize: 11 },
  foot: { textAlign: "center", fontSize: 11, marginTop: 22, lineHeight: 1.5, padding: "0 10px" },

  back: { fontSize: 13, background: "none", border: "none", padding: "4px 0", cursor: "pointer", letterSpacing: "0.02em" },
  roomHead: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2, paddingTop: 10 },
  roomGlyph: { fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", fontWeight: 700 },
  roomName: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", margin: "2px 0 0" },

  tabs: { display: "flex", gap: 6, marginTop: 18, borderBottom: "1px solid" },
  tab: { background: "none", border: "none", fontSize: 14, fontWeight: 600, padding: "10px 4px", marginRight: 14, cursor: "pointer", borderBottom: "2px solid transparent" },

  dateBtn: { display: "flex", alignItems: "center", gap: 12, border: "1px solid", borderRadius: 12, padding: "12px 14px", width: "100%", marginTop: 18, cursor: "pointer", color: "inherit", transition: "border-color .15s ease" },
  calIcon: { width: 30, height: 30, border: "1.5px solid", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, flex: "0 0 auto" },
  dateTextWrap: { display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start", flex: 1 },
  dateLbl: { fontFamily: mono, fontSize: 9.5, letterSpacing: "0.12em" },
  dateVal: { fontSize: 16, fontWeight: 700 },
  dateCaret: { fontSize: 14 },

  cal: { border: "1px solid", borderRadius: 12, padding: 14, marginTop: 8 },
  calHead: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  calTitle: { fontSize: 15, fontWeight: 700 },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 },
  calDow: { textAlign: "center", fontSize: 10, padding: "4px 0", fontFamily: mono },
  calDay: { aspectRatio: "1", background: "none", border: "none", fontSize: 13.5, borderRadius: 8, cursor: "pointer", fontFamily: mono },
  calSel: { background: "var(--accent)", color: "#fff", fontWeight: 800 },
  calToday: { background: "none", border: "none", fontSize: 12.5, marginTop: 10, cursor: "pointer", width: "100%", letterSpacing: "0.03em" },

  bigWrap: { textAlign: "center", marginTop: 26 },
  bigBtn: { width: 170, height: 170, borderRadius: "50%", border: "2px solid var(--accent)", background: "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--accent) 18%, transparent), transparent)", color: "inherit", cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 },
  bigPlus: { fontSize: 46, lineHeight: 1, color: "var(--accent)", fontWeight: 300 },
  bigVerb: { fontSize: 16, fontWeight: 700, letterSpacing: "0.02em" },
  bigHint: { fontSize: 12, marginTop: 12 },

  fields: { display: "flex", flexDirection: "column", gap: 8, marginTop: 18 },
  input: { border: "1px solid", borderRadius: 10, padding: "12px 14px", fontSize: 14.5, outline: "none", width: "100%", boxSizing: "border-box" },

  stub: { marginTop: 16, fontFamily: mono, fontSize: 14, color: "var(--accent)", textAlign: "center", borderTop: "1px dashed", borderBottom: "1px dashed", padding: "12px 0", letterSpacing: "0.01em" },

  logHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 26, marginBottom: 8 },
  logHead: { fontFamily: mono, fontSize: 12, letterSpacing: "0.1em" },
  logCount: { fontSize: 12 },
  empty: { fontSize: 13.5, textAlign: "center", padding: "26px 16px", lineHeight: 1.5 },
  list: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 },
  row: { display: "flex", alignItems: "center", gap: 10, borderRadius: 9, padding: "11px 12px" },
  rowBar: { width: 3, alignSelf: "stretch", borderRadius: 3, flex: "0 0 auto" },
  rowBody: { fontSize: 14, flex: 1, lineHeight: 1.35 },
  del: { background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: 4, opacity: 0.55 },

  statRow: { display: "flex", gap: 10, marginTop: 20 },
  statBig: { flex: 1, border: "1px solid", borderRadius: 12, padding: "16px 14px", textAlign: "center" },
  statNum: { fontFamily: mono, fontSize: 38, fontWeight: 700, lineHeight: 1 },
  statLbl: { fontSize: 11.5, marginTop: 6, lineHeight: 1.3 },

  villain: { marginTop: 14, border: "1px solid", borderRadius: 12, padding: "16px", textAlign: "center", display: "flex", flexDirection: "column", gap: 4 },
  villainLbl: { fontFamily: mono, fontSize: 10, letterSpacing: "0.2em" },
  villainName: { fontSize: 26, fontWeight: 800 },
  villainSub: { fontSize: 12 },

  boardHead: { fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", marginTop: 26, marginBottom: 10 },
  board: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 },
  boardRow: { display: "flex", alignItems: "center", gap: 10 },
  rank: { fontFamily: mono, fontSize: 12, width: 16 },
  boardName: { fontSize: 14, fontWeight: 600, width: 96, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  barTrack: { flex: 1, height: 8, borderRadius: 4, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 4 },
  boardN: { fontFamily: mono, fontSize: 14, fontWeight: 700, width: 22, textAlign: "right" },

  chart: { display: "flex", alignItems: "flex-end", gap: 6, height: 150, border: "1px solid", borderRadius: 12, padding: "14px 12px 10px" },
  chartCol: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", gap: 4 },
  chartVal: { fontFamily: mono, fontSize: 11 },
  chartBar: { width: "100%", maxWidth: 26, borderRadius: "3px 3px 0 0", minHeight: 2 },
  chartAxis: { fontSize: 11, textAlign: "center", marginTop: 8, fontFamily: mono },

  vault: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 },
  vaultRow: { border: "1px solid", borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 5 },
  vaultQuote: { fontSize: 14.5, fontStyle: "italic", lineHeight: 1.4 },
  vaultDate: { fontFamily: mono, fontSize: 10.5, letterSpacing: "0.08em" },

  shareNote: { marginTop: 20, fontSize: 12, textAlign: "center", fontStyle: "italic" },
};

/** Global CSS (pseudo-states + animations) parameterised by palette. */
export function globalCss(pal: Palette): string {
  return `
* { -webkit-tap-highlight-color: transparent; }
.roomcard { transition: transform .12s ease, border-color .12s ease; }
.roomcard:hover { transform: translateY(-2px); }
.roomcard:active { transform: translateY(0); }
.tab.on { border-bottom-color: var(--accent,#888) !important; }
.bigbtn { transition: transform .08s ease; animation: pop .28s ease; }
.bigbtn:active { transform: scale(.94); }
@keyframes pop { 0%{transform:scale(.9);} 60%{transform:scale(1.04);} 100%{transform:scale(1);} }
.stub { animation: print .3s ease; }
@keyframes print { from{opacity:0; transform:translateY(-6px);} to{opacity:1; transform:translateY(0);} }
.fld:focus { border-color: var(--accent,#888) !important; }
.datebtn:hover { border-color: var(--accent) !important; }
.calday:hover { background: ${pal.line}; }
.calnav { background: none; border: none; font-size: 22px; cursor: pointer; width: 34px; height: 34px; line-height: 1; }
.calnav:hover { color: var(--accent) !important; }
.del:hover { opacity: 1 !important; }
.themebtn:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
.exp:hover:not(:disabled) { border-color: var(--accent) !important; }
.exp:disabled { opacity: .45; cursor: not-allowed; }
.ghost:focus-visible, .bigbtn:focus-visible, .roomcard:focus-visible, .calday:focus-visible { outline: 2px solid var(--accent,#888); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { *, *::before { animation: none !important; transition: none !important; } }
input::placeholder { color: ${pal.dim}; }
`;
}
