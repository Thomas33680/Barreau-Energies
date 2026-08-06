import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, 'icon.svg');
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const sizes = [64, 192, 512];

for (const size of sizes) {
  await sharp(svgPath, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(outDir, `icon-${size}.png`));
  console.log(`generated icon-${size}.png`);
}

await sharp(svgPath, { density: 384 })
  .resize(512, 512)
  .png()
  .toFile(join(outDir, 'maskable-512.png'));
console.log('generated maskable-512.png');
