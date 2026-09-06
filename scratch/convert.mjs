import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const inputDir = '../public/heroforhome';
  const outputDir = '../public/heroforhomeframeswebp';

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
  console.log(`Converting ${files.length} files...`);
  
  const promises = files.map(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
    return sharp(inputPath).webp().toFile(outputPath);
  });
  
  await Promise.all(promises);
  console.log('Conversion complete!');
}

main().catch(console.error);
