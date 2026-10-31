// Gera as imagens PNG do site (ícones e imagem de compartilhamento) a partir de SVG,
// usando o sharp (declarado em devDependencies no package.json).
// Só gera o arquivo que estiver FALTANDO em public/: no seu computador os PNGs já existem
// e nada muda; no servidor de deploy eles são criados na hora do build.
// Para refazer uma imagem: apague o PNG em public/ e rode `npm run imagens`.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// O sharp não acha fonte nenhuma no servidor de build, então o texto da imagem de
// compartilhamento vira desenho (path) aqui mesmo, com as fontes do próprio projeto.
import sharp from 'sharp';
import opentype from 'opentype.js';
const fonte = (pacote, arquivo) => opentype.loadSync(`node_modules/@fontsource/${pacote}/files/${arquivo}`);
const poppins700 = fonte('poppins', 'poppins-latin-700-normal.woff');
const poppins600 = fonte('poppins', 'poppins-latin-600-normal.woff');
const mono500 = fonte('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff');
// Escreve um texto como <path>. espaco = letter-spacing em px.
function texto(f, conteudo, x, y, tamanho, cor, espaco = 0) {
  let d = '', cx = x;
  for (const ch of conteudo) {
    const g = f.charToGlyph(ch);
    d += g.getPath(cx, y, tamanho).toPathData(2);
    cx += (g.advanceWidth / f.unitsPerEm) * tamanho + espaco;
  }
  return `<path fill="${cor}" d="${d}"/>`;
}

const MARINHO = '#0B3456', ESCURO = '#071B2E', AMARELO = '#F7BE23';
// Coroa do logo (mesmas coordenadas do favicon.svg, numa caixa de 312x244)
const coroa = (cor = AMARELO, op = 1) =>
  `<g fill="${cor}" opacity="${op}"><polygon points="0,68 81,127 156,0 231,127 312,68 312,201 0,201"/><rect y="201" width="312" height="43" rx="21.5"/></g>`;

// Ícone: quadrado azul arredondado com a coroa (igual ao favicon.svg)
const icone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="6" y="6" width="500" height="500" rx="110" fill="${MARINHO}" stroke="#08243B" stroke-width="12"/><g transform="translate(100 125)">${coroa()}</g></svg>`;
// Maskable: fundo sangrado (o Android recorta em círculo/gota), coroa dentro da zona segura de 80%
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="${MARINHO}"/><g transform="translate(151 177) scale(0.673)">${coroa()}</g></svg>`;
// Apple: iOS arredonda sozinho, então vai sem cantos e sem transparência
const apple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="${MARINHO}"/><g transform="translate(100 125)">${coroa()}</g></svg>`;

// Imagem que aparece quando o link do site é compartilhado (WhatsApp, Instagram, Facebook)
const grade = Array.from({ length: 26 }, (_, i) => `<path d="M${i * 48} 0V630M0 ${i * 48}H1200"/>`).join('');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${ESCURO}"/>
<g stroke="#FFFFFF" stroke-opacity=".05" stroke-width="1">${grade}</g>
<g transform="translate(810 330) scale(1.47)">${coroa('#FFFFFF', 0.07)}</g>
<g transform="translate(80 72) scale(0.18)">${coroa()}</g>
${texto(poppins700, 'VALE', 152, 114, 54, '#FFFFFF')}
${texto(mono500, '// VALE SOLUÇÕES TECNOLÓGICAS', 80, 226, 20, AMARELO, 1.6)}
${texto(poppins700, 'Sites, sistemas e suporte', 80, 310, 68, '#FFFFFF', -1.4)}
${texto(poppins700, 'de TI no Vale do Paraíba.', 80, 381, 68, '#FFFFFF', -1.4)}
<rect x="80" y="422" width="110" height="6" fill="${AMARELO}"/>
${texto(poppins600, 'Orçamento grátis · (12) 98807-0341', 80, 548, 26, '#B8C6D6')}
</svg>`;

const imagens = [
  ['public/og-image.png', og, 1200],
  ['public/icon-192.png', icone, 192],
  ['public/icon-512.png', icone, 512],
  ['public/icon-maskable-512.png', maskable, 512],
  ['public/apple-touch-icon.png', apple, 180],
];

const destino = process.argv[2] || '.';
for (const [arquivo, svg, largura] of imagens) {
  const saida = join(destino, arquivo);
  if (existsSync(saida)) continue;
  await sharp(Buffer.from(svg), { density: 72 }).resize({ width: largura }).png({ compressionLevel: 9, palette: true }).toFile(saida);
  console.log(`[imagens] gerou ${arquivo}`);
}
