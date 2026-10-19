/**
 * Generates the placeholder photos (SVG illustrations) and placeholder PDFs that
 * the sample content points at. Run once with:  node scripts/generate-sample-assets.mjs
 * Replace the files (and the entries in src/content) with real material.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { sceneSvg } from '../src/lib/scene.js';

mkdirSync('src/assets/sample', { recursive: true });
mkdirSync('public/dokumenti', { recursive: true });

for (let i = 1; i <= 8; i++) {
  writeFileSync(`src/assets/sample/foto-${i}.svg`, sceneSvg({ seed: i * 3 + 1, width: 1600, height: 1200, xmlns: true }));
}

/** A tiny, valid one-page PDF with a few lines of ASCII text. */
function pdf(title, lines) {
  const esc = (s) => s.replace(/[\\()]/g, '\\$&');
  const content = [
    'BT /F1 26 Tf 60 760 Td (' + esc(title) + ') Tj ET',
    ...lines.map((l, i) => `BT /F1 14 Tf 60 ${710 - i * 22} Td (${esc(l)}) Tj ET`),
  ].join('\n');
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => (out += String(o).padStart(10, '0') + ' 00000 n \n'));
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return out;
}

const note = ['Vzorcni dokument.', 'Nadomestite ga z dejansko datoteko:', 'zamenjajte PDF v mapi public/dokumenti', 'in uredite opis v src/content/documents.'];
const docs = {
  'biodinamicni-preparati-pregled': 'Biodinamicni preparati - pregled',
  'predavanje-kompost-zapiski': 'Kompost kot temelj rodovitnosti - zapiski',
  'statut-drustva': 'Statut drustva Ajda Dolenjska',
  'predavanje-2023-tla-in-zivljenje': 'Tla in zivljenje - predavanje 2023',
};
for (const [file, title] of Object.entries(docs)) writeFileSync(`public/dokumenti/${file}.pdf`, pdf(title, note), 'latin1');
console.log('Generated 8 sample photos and', Object.keys(docs).length, 'sample PDFs.');
