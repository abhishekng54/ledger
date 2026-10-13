/**
 * The comedic "voice" of each room — the lines that print after a log.
 *
 * Kept separate from strings.ts on purpose: this is the most-iterated copy in
 * the product and defines each room's personality. Edit freely here without
 * touching UI chrome.
 *
 * Each room has:
 *   - `lines`:       shown on a first/normal log
 *   - `repeatLines`: shown when the same thing recurs (escalates the joke)
 *
 * `repeatLines` is a function so it can interpolate the running count and,
 * for The Receipts, the offender's name.
 */
import type { RoomKey } from "../types";

export interface RoomVoice {
  lines: string[];
  repeatLines: (count: number, who?: string) => string[];
}

export const VOICE: Record<RoomKey, RoomVoice> = {
  receipts: {
    lines: [
      "Logged. We don't forget.",
      "Noted. Filed under 'never again.'",
      "Received. The ledger remembers.",
      "Added to their permanent record.",
      "Stamped. No takebacks.",
    ],
    repeatLines: (n, who = "They") => [
      `That's ${n}. Just saying.`,
      `${who} again. A pattern emerges.`,
      `${n} now. We're watching.`,
      `Bold of ${who} to keep doing this.`,
    ],
  },

  tongue: {
    lines: [
      "You held it. Incredible.",
      "Restraint logged. A monk, basically.",
      "Swallowed. Respect.",
      "The comeback dies with dignity.",
      "Filed in the vault. Unsaid, undefeated.",
    ],
    repeatLines: (n) => [
      `${n} this month. You're basically a monk.`,
      `${n} bitten tongues. Sainthood pending.`,
      `${n} times silent. Loud internally, surely.`,
    ],
  },

  L: {
    lines: [
      "That's an L.",
      "Brutal. Logged anyway.",
      "Another one for the pile.",
      "Catastrophic. Love that for you.",
      "New personal worst. Proud of you.",
    ],
    repeatLines: (n) => [
      `${n} L's this week. Historic run.`,
      `${n} and counting. A masterclass in losing.`,
      `${n} L's. The chart only goes down.`,
    ],
  },
};
