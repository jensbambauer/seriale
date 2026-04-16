#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image size configurations per folder
const CONFIG = {
  'jury-': { width: 526, height: 526, fit: 'cover' },
  'speakers': { width: 526, height: 526, fit: 'cover' },
  'series': { width: 400, height: 225, fit: 'cover' },
  'pilots': { width: 400, height: 225, fit: 'cover' },
  'team': { width: 311, height: 311, fit: 'cover' },
  'impressions-': { width: 970, height: 647, fit: 'cover' },
};

const IMG_DIR = path.join(__dirname, '../site/static/img');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function getConfig(folderName) {
  for (const [key, config] of Object.entries(CONFIG)) {
    if (folderName.startsWith(key) || folderName === key) {
      return config;
    }
  }
  return null;
}

async function processImage(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) return false;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Skip if already correct size
    if (metadata.width === config.width && metadata.height === config.height) {
      return false;
    }

    // Create optimized version
    const buffer = await image
      .resize(config.width, config.height, {
        fit: config.fit,
        position: 'center',
      })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    // Write back (change extension to .jpg if needed)
    const newPath = filePath.replace(/\.(png|webp)$/i, '.jpg');
    fs.writeFileSync(newPath, buffer);

    // Remove original if extension changed
    if (newPath !== filePath) {
      fs.unlinkSync(filePath);
    }

    console.log(`✓ ${path.relative(IMG_DIR, newPath)} → ${config.width}x${config.height}`);
    return true;
  } catch (err) {
    console.error(`✗ ${filePath}: ${err.message}`);
    return false;
  }
}

async function processFolder(folderPath, config) {
  if (!fs.existsSync(folderPath)) return 0;

  const files = fs.readdirSync(folderPath);
  let processed = 0;

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      processed += await processFolder(filePath, config);
    } else if (stat.isFile()) {
      if (await processImage(filePath, config)) {
        processed++;
      }
    }
  }

  return processed;
}

async function main() {
  console.log('Optimizing images...\n');

  let totalProcessed = 0;

  // Get all folders in img directory
  const folders = fs.readdirSync(IMG_DIR).filter(f => 
    fs.statSync(path.join(IMG_DIR, f)).isDirectory()
  );

  for (const folder of folders) {
    const config = getConfig(folder);
    if (config) {
      const folderPath = path.join(IMG_DIR, folder);
      const count = await processFolder(folderPath, config);
      totalProcessed += count;
    }
  }

  console.log(`\nDone. ${totalProcessed} images optimized.`);
}

main().catch(console.error);
