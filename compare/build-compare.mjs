// Собирает самодостаточный HTML сравнения: вшивает оба борда строками в шаблон.
import fs from 'node:fs';
const [tpl, orig, red, out] = process.argv.slice(2);
const enc = (s) => JSON.stringify(s).replace(/</g, '\\u003c');
let t = fs.readFileSync(tpl, 'utf8');
for (const [mark, file] of [['/*__ORIG__*/""', orig], ['/*__RED__*/""', red]]) {
  if (!t.includes(mark)) throw new Error('нет метки ' + mark);
  t = t.replace(mark, () => enc(fs.readFileSync(file, 'utf8')));
}
fs.writeFileSync(out, t);
console.log('OK', out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
