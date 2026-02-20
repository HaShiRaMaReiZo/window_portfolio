#!/usr/bin/env node
/**
 * Extracts Windows 10 icons from system imageres.dll.mun into public/icons/.
 * Run on Windows (npm run extract-icons).
 *
 * To use the 7tsp pack icons (e.g. ardentaa): install the pack with 7tsp GUI
 * first so it patches the system file, then run this script. The extracted
 * icons will be the pack's icons.
 *
 * Usage: node scripts/extract-win10-icons.mjs
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as PELibrary from "pe-library";
import * as ResEdit from "resedit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "icons");

// imageres icon IDs (Windows 10): 3 = folder, 4 = open folder, 109/107 = PC/computer, etc.
const ICON_MAP = [
  { id: 3, name: "folder" },      // folder (Projects)
  { id: 109, name: "thispc" },    // This PC / computer (try 109 first)
  { id: 107, name: "thispc" },    // fallback PC icon
  { id: 23, name: "about" },     // user/person
  { id: 2, name: "resume" },     // document
  { id: 165, name: "skills" },   // settings/gear
  { id: 168, name: "contact" },  // contact/people
];

function getImageresPath() {
  const paths = [
    path.join(process.env.SystemRoot || "C:\\Windows", "SystemResources", "imageres.dll.mun"),
    path.join(process.env.SystemRoot || "C:\\Windows", "System32", "imageres.dll"),
  ];
  for (const p of paths) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (_) {}
  }
  return null;
}

function main() {
  const imageresPath = getImageresPath();
  if (!imageresPath) {
    console.error("Could not find imageres.dll.mun or imageres.dll. Run on Windows.");
    process.exit(1);
  }

  let data;
  try {
    data = fs.readFileSync(imageresPath);
  } catch (e) {
    console.error("Could not read", imageresPath, e.message);
    console.error("Try running as Administrator or copy the file to the project folder.");
    process.exit(1);
  }

  const exe = PELibrary.NtExecutable.from(data);
  const res = PELibrary.NtExecutableResource.from(exe);
  const groups = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);

  const byId = new Map();
  for (const g of groups) byId.set(Number(g.id), g);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const written = new Set();
  for (const { id, name } of ICON_MAP) {
    if (written.has(name)) continue;
    const group = byId.get(id);
    if (!group) continue;
    const iconItems = group.getIconItemsFromEntries(res.entries);
    if (!iconItems.length) continue;
    const iconFile = new ResEdit.Data.IconFile();
    iconFile.icons = iconItems.map((item) => ({ data: item }));
    const ico = Buffer.from(iconFile.generate());
    const outPath = path.join(OUT_DIR, `${name}.ico`);
    fs.writeFileSync(outPath, ico);
    console.log("Wrote", outPath);
    written.add(name);
  }

  if (written.size === 0) {
    console.error("No icons extracted. Available icon group IDs:", [...byId.keys()].sort((a, b) => a - b).slice(0, 30));
    process.exit(1);
  }
  console.log("Done. Extracted", written.size, "icons.");
}

main();
