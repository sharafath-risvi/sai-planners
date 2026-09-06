import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const dir = 'public/images';

  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.jpg'));
  console.log(`Converting ${files.length} files...`);
  
  const promises = files.map(file => {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.JPG$/i, '.webp'));
    return sharp(inputPath).webp().toFile(outputPath);
  });
  
  await Promise.all(promises);
  console.log('Conversion complete!');
}

main().catch(console.error);
