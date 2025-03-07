const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const config = {
  inputDir: 'public',
  outputDir: 'public/optimized',
  quality: 80,
  maxWidth: 1920,
  formats: ['jpg', 'jpeg', 'png'],
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Find all images
const imageFiles = glob.sync(`${config.inputDir}/**/*.{${config.formats.join(',')}}`, {
  ignore: [`${config.outputDir}/**`],
});

console.log(`Found ${imageFiles.length} images to optimize`);

// Process each image
(async () => {
  for (const file of imageFiles) {
    const filename = path.basename(file);
    const outputPath = path.join(config.outputDir, filename);
    
    // Skip if already optimized and newer than source
    if (
      fs.existsSync(outputPath) &&
      fs.statSync(outputPath).mtimeMs > fs.statSync(file).mtimeMs
    ) {
      console.log(`Skipping ${filename} (already optimized)`);
      continue;
    }
    
    try {
      console.log(`Optimizing ${filename}...`);
      
      // Process with sharp
      await sharp(file)
        .resize({
          width: config.maxWidth,
          withoutEnlargement: true,
        })
        .jpeg({ quality: config.quality, progressive: true })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(file).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
      
      console.log(`✅ ${filename}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% saved)`);
    } catch (error) {
      console.error(`❌ Error optimizing ${filename}:`, error.message);
    }
  }
  
  console.log('Image optimization complete!');
})();

// Helper function to format bytes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} 