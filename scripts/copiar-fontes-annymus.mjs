// Copia as fontes das landing pages do Annymus (Sora + Plus Jakarta Sans)
// de node_modules/@fontsource para public/annymus/fonts/ antes do build.
// Por quê: as LPs são HTML puro em public/, então o Astro não processa os imports
// de fonte delas. Assim a versão da fonte fica presa no package.json (uma fonte de verdade)
// e o site não depende do Google Fonts.
import { mkdirSync, copyFileSync } from 'node:fs';

const destino = 'public/annymus/fonts';
const fontes = [
  ['sora', 'sora-latin-700-normal.woff2'],
  ['sora', 'sora-latin-800-normal.woff2'],
  ['plus-jakarta-sans', 'plus-jakarta-sans-latin-400-normal.woff2'],
  ['plus-jakarta-sans', 'plus-jakarta-sans-latin-600-normal.woff2'],
  ['plus-jakarta-sans', 'plus-jakarta-sans-latin-700-normal.woff2'],
];

mkdirSync(destino, { recursive: true });
for (const [pacote, arquivo] of fontes) {
  copyFileSync(`node_modules/@fontsource/${pacote}/files/${arquivo}`, `${destino}/${arquivo}`);
}
console.log(`[fontes] ${fontes.length} fontes do Annymus copiadas para ${destino}`);
