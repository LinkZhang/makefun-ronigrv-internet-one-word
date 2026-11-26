// Reviser note (second session): "BlackHole" is the whole internet in one
// word because it is a place, not an adjective — everything that goes in
// (time, attention, money, the evening you had planned) never comes back
// out, and the reader laughs first, then nods. The twist is the scale:
// a black hole is cosmic, and the internet is the only everyday thing
// that eats time the same way. Kept the entry text byte-identical; added
// one more gate self-check below (exactly one whitespace-separated token,
// pure ASCII so byte length equals char length).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "BlackHole";

// Gate self-checks (RULES.txt: UTF-8 text of 1 to 30 characters,
// not only white space; single word).
if (ENTRY.length < 1 || ENTRY.length > 30) {
  throw new Error(`entry is ${ENTRY.length} chars, gate requires 1-30`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
if (/\s/.test(ENTRY)) {
  throw new Error("entry must be a single word (no whitespace)");
}
if (!/^[A-Za-z]+$/.test(ENTRY)) {
  throw new Error("entry must be a single word of letters");
}
// Reviser check: exactly one whitespace-separated token, and pure ASCII
// (byte length equals char length) so the entry is one indivisible word.
if (ENTRY.trim().split(/\s+/).length !== 1) {
  throw new Error("entry must be exactly one word");
}
if (Buffer.byteLength(ENTRY, "utf8") !== ENTRY.length) {
  throw new Error("entry must be pure ASCII");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${ENTRY.length} chars)`);
