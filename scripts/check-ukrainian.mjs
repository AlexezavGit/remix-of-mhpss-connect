#!/usr/bin/env node
// Blocks build if user-visible UI strings contain untranslated English.
// Strategy: only inspect (a) JSX text nodes and (b) object-literal string values
// under keys that we know render as user-visible copy in this codebase.

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

// Object keys whose string values are rendered as visible UI copy.
const VISIBLE_KEYS = new Set([
  "title","lead","desc","description","helper","note","submitLabel","label",
  "placeholder","question","answer","subtitle","caption","kicker","body","text",
  "t","d","b","k","name","heading","summary","cta","tag",
]);

// Tokens allowed to appear untranslated (brands, acronyms, loanwords).
const ALLOW = new Set(
  [
    "feel","again","fa","mhpss","bloomberg","google","supabase","lovable","github",
    "usaid","ebrd","nbu","moz","who","un","eu","us","npa","esoz",
    "enkidu","clalit","geha","knu","quoroom","viterbi","usc","metinvest","bravemind",
    "mckinsey","apple","openai","b17","helppoint","psychat",
    "me","com","org","net","io","www","https","http","html","css","js","ts","tsx","md","svg","png","jpg",
    "feelagain","dashboard","gazelles","flow","app","site",
    "id","ai","ui","ux","cbt","emdr","vr","ar","xr","phq","gad","pcl","fhir","iso","kpi","kpis",
    "esg","csr","roi","gps","crm","vc","vcs","w3c","did","daly","dalys","gdp","jwt","rls","api",
    "sdk","sms","pin","otp","ok","pdf","csv","json","xml","utc","gmt","ci","cd","qa",
    "prom","proms","hdp","ifi","ifis","nexus","hipaa","gdpr","fda","ema","emr","emrs","ehr","ehrs",
    "camt","pain","iban","swift","sepa","escrow","ledger","stack","token","tokens","waterfall",
    "demo","email","tag","tags","hub","map","matrix","case","cases","scoring","fintech","clinical","digital",
    "start","stop","on","off","in","out","up","a","an","the","of","to","by","is","or","and","for","with","from","as","at","be",
    "en","uk","ua","ru",
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
    else if (/\.tsx$/.test(entry)) scanFile(full);
  }
}

function pushCandidate(cands, text, index, src) {
  const line = src.slice(0, index).split("\n").length;
  cands.push({ text, line });
}

function scanFile(file) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const candidates = [];

  // 1) JSX text nodes between > and <
  const jsxRe = />([^<>{}\n]{2,})</g;
  let m;
  while ((m = jsxRe.exec(src))) {
    // Skip closing tag artifacts and pure whitespace/punct.
    const raw = m[1];
    if (!/[A-Za-z\u0400-\u04FF]/.test(raw)) continue;
    pushCandidate(candidates, raw, m.index + 1, src);
  }

  // 2) Object-literal string values under visible keys: key: "..." or key: '...'
  const kvRe = /(?:^|[\s,{(\[])([A-Za-z_$][\w$]*)\s*:\s*(["'])((?:\\.|(?!\2).){2,})\2/g;
  let k;
  while ((k = kvRe.exec(src))) {
    const key = k[1];
    if (!VISIBLE_KEYS.has(key)) continue;
    pushCandidate(candidates, k[3], k.index + k[0].indexOf(k[2]) + 1, src);
  }

  // 3) JSX attributes that render user-visible text: placeholder, title, alt, aria-label.
  const attrRe = /\b(placeholder|alt|aria-label|title)\s*=\s*(["'])((?:\\.|(?!\2).){2,})\2/g;
  let a;
  while ((a = attrRe.exec(src))) {
    pushCandidate(candidates, a[3], a.index, src);
  }

  for (const c of candidates) {
    const text = c.text.replace(/\\n|\\t|&nbsp;|&mdash;|&amp;/g, " ").trim();
    if (!text) continue;
    if (CYRILLIC.test(text)) continue;
    if (!/[A-Za-z]/.test(text)) continue;
    if (/^https?:/i.test(text)) continue;
    // Skip Tailwind/CSS-like tokens.
    if (/\b(text|bg|border|from|to|via|ring|shadow|font|rounded|hover|focus|group|tag)-[a-z0-9[]/.test(text)) continue;
    if (/\b(hsl|rgb|var|calc|linear-gradient|radial-gradient|translate|rotate|scale)\s*\(/.test(text)) continue;
    if (/^[a-z]+(?:-[a-z0-9]+)+$/.test(text)) continue; // kebab tokens
    const words = text.match(LATIN_WORD) || [];
    if (words.length === 0) continue;
    const offending = words.filter((w) => !ALLOW.has(w.toLowerCase()));
    if (offending.length === 0) continue;
    results.push({ file: rel, line: c.line, text, offending });
  }
}

for (const d of SCAN_DIRS) {
  try { walk(join(ROOT, d)); } catch {}
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
  `\nFix: translate to Ukrainian, or extend ALLOW in scripts/check-ukrainian.mjs for intentional brand/acronym tokens.\n`
);
process.exit(1);
