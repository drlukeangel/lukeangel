import { readFileSync, writeFileSync } from 'node:fs';
const files = [
  'src/content/gratitude/2026-05-09.md',
  'src/content/gratitude/2026-05-10.md',
  'src/content/gratitude/2026-05-11.md',
  'src/content/gratitude/2026-05-12.md',
];
for (const f of files) {
  let s = readFileSync(f, 'utf8');
  // tag: <value> → topic: everyday\nlevel: <value>
  const m = s.match(/^tag:\s*(small|medium|large)\s*$/m);
  const level = m ? m[1] : 'small';
  s = s.replace(/^tag:.*$/m, `topic: everyday\nlevel: ${level}`);
  writeFileSync(f, s, 'utf8');
  console.log(`fixed ${f}`);
}
