# Ledger

A dark-comedy "emotional bookkeeping" app for Android (and the web). Log who wronged you, what you bit your tongue on, and what you lost. The app keeps the books.

**Offline. No login. No tracking. Everything stays on your device.**

## Features

One app, three rooms:

| Room | What you log | What you get |
| --- | --- | --- |
| **The Receipts** | Who wronged you | A Top Offenders leaderboard and a Villain of the Month |
| **Bit My Tongue** | What you held back | The Vault of lines you never said |
| **Taking the L** | Your losses | A weekly chart that only crashes |

- **Tap-first logging.** One tap logs an entry and fires a voice line; details are optional and never block logging.
- **Any date.** Log to today or pick a day from the calendar.
- **Light and dark themes.** The app follows the device's setting until you tap the theme toggle; after that your choice is saved and used on every launch.
- **Export.** Download or share every entry as a CSV file that opens correctly in Excel. On Android it opens the native share sheet; in a browser it downloads the file.

## Tech stack

React 18 · TypeScript 5 · Vite 5 · Capacitor 7 (Android) with the Filesystem and Share plugins. There is no backend and the app makes no network calls.

## Install the prebuilt app

A debug build is checked in at [`releases/ledger-debug.apk`](releases/ledger-debug.apk). It is meant for trying the app, not for the Play Store.

1. Copy the APK to an Android 6.0+ phone, or download it from GitHub on the phone.
2. Open it and allow installs from this source when prompted.
3. Or, with USB debugging enabled: `adb install -r releases/ledger-debug.apk`.

If you previously installed a build signed with a different key, uninstall it first.

The application ID is `io.github.abhishekng54.ledger`. An earlier build with the ID `com.theledger.app` is a separate app and is not upgraded: export a CSV from it, then uninstall it.

## Build from source

### Prerequisites

| Tool | Version | Needed for |
| --- | --- | --- |
| Node.js | 20 or newer | Everything (the Capacitor CLI requires 20+) |
| npm | 10 or newer | Everything |
| JDK | 21 | Android build |
| Android SDK | Platform 35 (min SDK 23 / Android 6.0) | Android build |

The easiest way to get the Android SDK is [Android Studio](https://developer.android.com/studio). Gradle (8.11.1) and the Android Gradle Plugin (8.7.2) are fetched automatically by the project's Gradle wrapper.

The steps below were verified from a clean clone on macOS with Node 20.18, npm 10.8 and JDK 21.

### Run in the browser

All commands run from the repository root.

```bash
git clone https://github.com/abhishekng54/the-ledge.git
cd the-ledge
npm ci            # install exact dependency versions from package-lock.json
npm run dev       # dev server at http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type-check, then production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |
| `npm run cap:sync` | Build, then copy `dist/` and the plugins into the Android project |
| `npm run cap:open` | Open the Android project in Android Studio |

### Build the Android APK

The native project is committed in `android/`. Point the build at your JDK and Android SDK, then build:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)   # macOS; on other systems point JAVA_HOME at a JDK 21
export ANDROID_HOME=$HOME/Library/Android/sdk      # adjust to where your Android SDK is installed

npm ci
npm run cap:sync              # build the web app and copy it into android/
cd android
./gradlew assembleDebug       # Windows: gradlew.bat assembleDebug
```

The APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`.

Run `npm run cap:sync` again whenever the web code changes, so the new build is copied in before you assemble the APK. Android Studio sets the SDK location for you: run `npm run cap:open`, then press Run.

### Release build

The repo ships only a debug build. To publish your own signed build, follow the standard Android procedure:

1. Create a keystore with `keytool -genkey -v -keystore ledger-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ledger`.
2. Add a signing configuration to `android/app/build.gradle`, reading the passwords from a local, untracked file.
3. Run `./gradlew bundleRelease` for a Play Store bundle (`.aab`), or `./gradlew assembleRelease` for an APK.

Never commit the keystore or its passwords.

## Releasing

Each release needs:

1. A higher `versionCode` and a new `versionName` in `android/app/build.gradle`, with the same version in `package.json`.
2. A changelog at `fastlane/metadata/android/en-US/changelogs/<versionCode>.txt` (500 characters at most).
3. A git tag named `v<versionName>` (for example `v1.0.0`) on the release commit, created after the change is merged into `main`.

The store listing text lives in `fastlane/metadata/android/en-US/` and is the format F-Droid reads from the source repository.

## Configuration

The application ID is `io.github.abhishekng54.ledger`, a reverse-domain ID under the project owner's GitHub namespace. It is set in these places, which must stay in sync:

- `capacitor.config.ts`: `appId` and `appName`.
- `src/constants/config.ts`: the `APP` constant.
- `android/app/build.gradle`: `namespace` and `applicationId`.
- `android/app/src/main/res/values/strings.xml`: `package_name`.
- The package of `MainActivity.java` and its folder under `android/app/src/main/java/`.

Changing the ID after release makes it a different app: existing installs are not upgraded.

## Project structure

The code is deliberately modular, so rooms and copy can change without ripple effects.

```
android/              Native Android project (Capacitor)
fastlane/             Store listing text and changelogs
releases/             Prebuilt debug APK
src/
├── types/            Domain types, the shared contract (Entry, RoomConfig, ...)
├── constants/
│   ├── config.ts     Storage keys, app identity, CSV and haptic settings
│   ├── strings.ts    All user-facing UI copy
│   ├── voiceLines.ts The comedic voice per room
│   └── theme.ts      Dark and light palettes
├── lib/              Framework-free logic (pure, testable)
│   ├── date.ts       ISO date helpers (timezone-safe)
│   ├── storage.ts    Offline storage (localStorage with an in-memory fallback)
│   ├── entries.ts    Data model: persistence, CRUD, selectors
│   ├── voice.ts      Voice-line selection
│   └── csv.ts        CSV build, plus the browser and native export paths
├── hooks/
│   ├── useEntries.ts Entries state, persistence and actions
│   └── useTheme.ts   Theme state: follows the device until the user toggles
├── rooms/            One file per room: config and its own Stats renderer
│   ├── index.ts      Room registry, the one place to add a room
│   ├── receipts.tsx
│   ├── tongue.tsx
│   └── L.tsx
├── components/       Presentational React (Home, Room, LogTab, Calendar, ...)
│   └── ui/           Shared primitives
├── styles/styles.ts  Style tokens and themed global CSS
└── Ledger.tsx        Root: wires hooks and routing
```

### Adding a room

1. Add its key to `RoomKey` in `src/types/index.ts`.
2. Add its voice to `src/constants/voiceLines.ts`.
3. Create `src/rooms/<name>.tsx` exporting a `RoomModule` (config and `Stats`).
4. Register it in `src/rooms/index.ts` (`ROOMS` and `ROOM_ORDER`).

Nothing else changes: Home, Room and the stats views all read the registry.

## Contributing

`main` is protected: direct pushes, force-pushes and deleting the branch are blocked, and every change goes through a pull request.

1. Branch from `main`.
2. Make your change, then check it: `npm run typecheck && npm run build`.
3. Open a pull request into `main` with a short description of what changed and why.
4. Resolve all review conversations before merging.

Do not commit `node_modules/`, `dist/`, build output, keystores or local environment files; the included `.gitignore` files already exclude them.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `SDK location not found` | Set `ANDROID_HOME` to your Android SDK, or put `sdk.dir=/path/to/Android/sdk` in `android/local.properties`. Android Studio creates that file for you. |
| `Could not read script ... cordova.variables.gradle as it does not exist` | The generated plugin folder is missing. Run `npm run cap:sync` before building. |
| `invalid source release: 21` or `Unsupported class file major version` | Gradle is using the wrong JDK. Point `JAVA_HOME` at a JDK 21. |
| `Could not find the web assets directory: ./dist` | Run `npm run build` first (`npm run cap:sync` does this for you). |
| The phone refuses to install the APK | Allow installs from unknown sources for the app you opened it with, and uninstall any earlier build signed with a different key. |
| Changes don't show up in the app | Run `npm run cap:sync` before building the APK, so the new web build is copied in. |

## Privacy

No network calls, no analytics, no accounts. Entries are stored in the app's local storage on the device, so they are removed if you uninstall the app or clear its data. Use the CSV export to keep a copy.

## License

Apache License 2.0. See [LICENSE](LICENSE).
