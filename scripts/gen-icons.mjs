import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, '..', 'public', 'logo-icon.svg');
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

function roundedSquareSvg(size, radius) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#ffffff"/></svg>`,
  );
}

function plainSquareSvg(size) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="#ffffff"/></svg>`,
  );
}

async function composeIcon({ size, logoScale, radius, outFile }) {
  const background = radius > 0 ? roundedSquareSvg(size, radius) : plainSquareSvg(size);
  const logoSize = Math.round(size * logoScale);
  const logoBuffer = await sharp(logoPath, { density: 384 }).resize(logoSize, logoSize).png().toBuffer();
  const offset = Math.round((size - logoSize) / 2);

  await sharp(background)
    .png()
    .composite([{ input: logoBuffer, left: offset, top: offset }])
    .toFile(outFile);
  console.log(`generated ${outFile}`);
}

for (const size of [64, 192, 512]) {
  await composeIcon({ size, logoScale: 0.72, radius: Math.round(size * 0.18), outFile: join(outDir, `icon-${size}.png`) });
}

// Maskable icon: OS applies its own crop shape, keep content within the safe zone (~center 60%).
await composeIcon({ size: 512, logoScale: 0.58, radius: 0, outFile: join(outDir, 'maskable-512.png') });
