#!/usr/bin/env node
// Blocks build if user-facing UI strings contain untranslated English.
// Scans .tsx files in src/pages and src/components (excluding shadcn ui, i18n, integrations).
// Heuristic: extracts JSX text nodes and string literals; flags strings that contain
// English words (>=3 ASCII latin letters) not in the allowlist and lack Cyrillic.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/pages", "src/components"];
const EXCLUDE = [
  "src/components/ui",
  "src/components/background",
  "src/components/ring/RingHub.tsx",
  "src/components/ring/CopperRing.tsx",
  "src/components/DashboardTicker.tsx",
];

// Tokens allowed to appear untranslated (brands, acronyms, loanwords, protocols).
const ALLOW = new Set(
  [
    // brand / product
    "feel","again","fa","mhpss","bloomberg","google","supabase","lovable","github",
    "usaid","ebrd","nbu","moz","who","un","eu","us",
    "enkidu","clalit","geha","knu","quoroom","viterbi","usc","metinvest","bravemind",
    "mckinsey","apple","openai",
    // domains / paths / files
    "me","com","org","net","io","www","https","http","html","css","js","ts","tsx","md","svg","png","jpg",
    "feelagain","dashboard","gazelles","flow","lovable","app","site",
    // technical acronyms
    "id","ai","ui","ux","cbt","emdr","vr","ar","xr","phq","gad","pcl","fhir","iso","kpi","kpis",
    "esg","csr","roi","gps","crm","vc","vcs","w3c","did","daly","dalys","gdp","jwt","rls","api",
    "sdk","sms","pin","otp","ok","pdf","csv","json","xml","utc","gmt","ci","cd","qa",
    "prom","proms","hdp","ifi","ifis","nexus","hipaa","gdpr","fda","ema","emr","emrs","ehr","ehrs",
    "camt","pain","iban","swift","sepa","escrow","ledger","stack","token","tokens",
    // loanwords commonly used inside Ukrainian tech text
    "demo","email","password","login","sign","in","out","up","on","off",
    "start","stop","link","links","tag","tags","note","case","cases","matrix","hub","map",
    // very short generic
    "a","an","the","of","to","by","is","or","and","for","with","from","as","at","be",
    // colors / letters occasionally in code strings
    "en","uk","ua","ru","hex","rgb","rgba","hsl","hsla","px","rem","em","vh","vw",
  ].map((s) => s.toLowerCase())
);

const CYRILLIC = /[\u0400-\u04FF]/;
const LATIN_WORD = /[A-Za-z]{3,}/g;

const results = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full);
    if (EXCLUDE.some((e) => rel === e || rel.startsWith(e + "/"))) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(entry)) scanFile(full);
  }
}

function scanFile(file) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const candidates = [];

  // 1) JSX text nodes between > and <
  //    Only for .tsx; skip contents starting with a lowercase tag-continuation.
  if (file.endsWith(".tsx")) {
    const re = />([^<>{}\n]{2,})</g;
    let m;
    while ((m = re.exec(src))) {
      const line = src.slice(0, m.index).split("\n").length;
      candidates.push({ text: m[1], line, kind: "jsx" });
    }
  }

  // 2) String literals (single/double quoted) — filter to plausible sentences.
  const strRe = /(["'])((?:\\.|(?!\1).){2,})\1/g;
  let s;
  while ((s = strRe.exec(src))) {
    // Skip import/require lines quickly.
    const lineStart = src.lastIndexOf("\n", s.index) + 1;
    const lineEnd = src.indexOf("\n", s.index);
    const lineText = src.slice(lineStart, lineEnd === -1 ? src.length : lineEnd);
    if (/^\s*(import|export|from|require|\/\/|\*|\/\*)/.test(lineText)) continue;
    // Skip attributes that are clearly non-text (className, href, src, id, key, to, path, type, name, role, aria-*, data-*, style, target, rel, mode, variant, size, color, tone).
    const before = src.slice(Math.max(0, s.index - 40), s.index);
    if (/(className|href|src|to|path|type|name|role|id|key|target|rel|mode|variant|size|color|tone|placeholder|aria-[a-z]+|data-[a-z-]+|style|font|bg|from|value|url|slug|import|require|as)\s*[:=]\s*$/i.test(before)) {
      // still allow placeholder — placeholder IS user-facing; re-enable it:
      if (!/placeholder\s*[:=]\s*$/i.test(before)) continue;
    }
    const line = src.slice(0, s.index).split("\n").length;
    candidates.push({ text: s[2], line, kind: "str" });
  }

  for (const c of candidates) {
    const text = c.text.replace(/\\n|\\t|&nbsp;|&mdash;|&amp;/g, " ").trim();
    if (!text) continue;
    if (CYRILLIC.test(text)) continue; // has UA content → ok
    if (!/[A-Za-z]/.test(text)) continue; // no letters
    // ignore code-ish / path-ish / css-ish
    if (/[{}<>$`]/.test(text)) continue;
    if (/^[\w./-]+$/.test(text) && text.includes("/")) continue; // paths
    if (/^https?:/i.test(text)) continue;
    if (/^[a-z-]+(?:\s+[a-z0-9:/#-]+)+$/i.test(text) && /(:|#|px|rem)/.test(text)) continue; // css
    // ignore very short tokens / single words that are pure brand/acronym
    const words = text.match(LATIN_WORD) || [];
    if (words.length === 0) continue;
    const offending = words.filter((w) => !ALLOW.has(w.toLowerCase()));
    if (offending.length === 0) continue;
    // require at least one offending word that is a real english-looking word
    // (letters only, length >= 3). This is already the case via LATIN_WORD.
    results.push({ file: rel, line: c.line, text, offending });
  }
}

for (const d of SCAN_DIRS) {
  try {
    walk(join(ROOT, d));
  } catch {}
}

if (results.length === 0) {
  console.log("✓ UA-only check passed — no untranslated English strings found.");
  process.exit(0);
}

console.error(`\n✗ UA-only check failed: found ${results.length} untranslated string(s).\n`);
for (const r of results.slice(0, 200)) {
  console.error(`  ${r.file}:${r.line}  "${r.text}"  [${r.offending.join(", ")}]`);
}
if (results.length > 200) console.error(`  … and ${results.length - 200} more`);
console.error(
  `\nFix: translate to Ukrainian, or add the token to the ALLOW set in scripts/check-ukrainian.mjs if it is an intentional brand/acronym.\n`
);
process.exit(1);
