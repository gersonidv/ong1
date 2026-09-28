// Uso: coloque as fotos originais (jpg/png) em img/originais/ e rode: node converter.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const entrada = path.join(__dirname, 'img', 'originais');
const saida = path.join(__dirname, 'img');
const arquivos = fs.readdirSync(entrada).filter(f => /\.(jpe?g|png)$/i.test(f));

if (!arquivos.length) console.log('Nenhuma imagem encontrada em img/originais/');

(async () => {
  for (const arq of arquivos) {
    const nome = path.parse(arq).name.toLowerCase().replace(/\s+/g, '-');
    const base = sharp(path.join(entrada, arq)).rotate().resize({ width: 1200, withoutEnlargement: true });
    await base.clone().avif({ quality: 50 }).toFile(path.join(saida, nome + '.avif'));
    await base.clone().webp({ quality: 80 }).toFile(path.join(saida, nome + '.webp'));
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(saida, nome + '.jpg'));
    console.log('OK:', nome, '(.avif, .webp, .jpg)');
  }
})();
