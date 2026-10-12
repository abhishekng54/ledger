# The Ledger

A dark-comedy "emotional bookkeeping" app. One app, three rooms:

- **The Receipts** — log who wronged you → Top Offenders leaderboard + Villain of the Month
- **Bit My Tongue** — log what you held back → the Vault of lines you never said
- **Taking the L** — log your losses → a weekly chart that only crashes

**Offline. No login. On-device only.** Light + dark themes. Log to any date via the calendar. Export everything to CSV/Excel.

---

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build → dist/
npm run typecheck  # types only
```

## Architecture

The codebase is deliberately modular so rooms and copy can change without ripple effects.

```
src/
├── types/            Domain types — the shared contract (Entry, RoomConfig, …)
├── constants/
│   ├── config.ts     Storage keys, app identity, CSV + haptic settings
│   ├── strings.ts    ALL user-facing UI chrome copy
│   ├── voiceLines.ts The comedic voice per room (iterated most; kept separate)
│   └── theme.ts      Dark/light palettes
├── lib/              Framework-free logic (pure, testable)
│   ├── date.ts       ISO date helpers (timezone-safe)
│   ├── storage.ts    Offline storage shim (localStorage + memory fallback)
│   ├── entries.ts    Data model: persistence, CRUD factory, selectors
│   ├── voice.ts      Voice-line selection
│   └── csv.ts        CSV build + download (native branch documented inside)
├── hooks/
│   ├── useEntries.ts Entries state + persistence + actions
│   └── useTheme.ts   Theme state + resolved palette
├── rooms/            One file per room: config + its own Stats renderer
│   ├── index.ts      Room registry — the ONE place to add a room
│   ├── receipts.tsx
│   ├── tongue.tsx
│   └── L.tsx
├── components/       Presentational React (Home, Room, LogTab, Calendar, …)
│   └── ui/           Shared primitives (StatBig, ShareNote, EmptyStats)
├── styles/styles.ts  Style tokens + themed global CSS factory
└── Ledger.tsx        Root: wires hooks + routing
```

### Adding a new room
1. Add its key to `RoomKey` in `src/types/index.ts`.
2. Add its voice to `src/constants/voiceLines.ts`.
3. Create `src/rooms/<name>.tsx` exporting a `RoomModule` (config + `Stats`).
4. Register it in `src/rooms/index.ts` (`ROOMS` + `ROOM_ORDER`).

Nothing else changes — Home, Room, and stats dispatch all read the registry.

### Design principles
- **Tap-first, type-optional.** A single tap logs instantly and fires a voice line; detail inputs never block logging.
- **Stats are the product.** Each room owns its own visualisation.
- **Pure logic in `lib/`.** State lives in hooks; components stay declarative.

## Android (Capacitor)
`capacitor.config.ts` is included. See the separate build brief for the full
APK steps. In short: `npm run build` → `npx cap add android` → `npx cap sync` →
build in Android Studio. The CSV export has a documented native branch in
`src/lib/csv.ts` (use `@capacitor/filesystem` + `@capacitor/share` on device).

## Privacy
No network calls, no analytics, no accounts. All data stays in the device's
local storage. Works fully in airplane mode.
