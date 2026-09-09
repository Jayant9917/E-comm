const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const { root, manifestPath, validateCatalog, readManifest, imageHash } = require('./catalog');
const logger = require('../config/logger');

async function main() {
  const products = validateCatalog();
  if (process.argv.includes('--dry-run')) {
    logger.info(`Validated ${products.length} products: ${products.filter(p => p.gender === 'Men').length} men, ${products.filter(p => p.gender === 'Women').length} women. No uploads performed.`);
    return;
  }
  for (const key of ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']) {
    if (!process.env[key]) throw new Error(`Missing ${key}`);
  }
  cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
  await cloudinary.api.ping();
  const manifest = readManifest();
  let completed = 0;
  const failures = [];
  // Save each successful upload immediately so an interrupted run can resume.
  for (const product of products) {
    const sha256 = imageHash(product.imageFile);
    const existing = manifest[product.imageFile];
    if (existing?.sha256 === sha256 && existing.cloud_name === process.env.CLOUDINARY_CLOUD_NAME) {
      logger.info(`[${++completed}/${products.length}] Reuse ${product.sku}`);
      continue;
    }
    const publicId = `rabbit/catalog/${product.imageFile.split('/')[0]}/${product.sku.toLowerCase()}-${sha256.slice(0, 12)}`;
    try {
      let uploadPath = path.join(root, 'images', product.imageFile);
      if (fs.statSync(uploadPath).size > 10 * 1024 * 1024) {
        const preparedDir = path.join(root, '.catalog-work', 'prepared');
        fs.mkdirSync(preparedDir, { recursive: true });
        const preparedPath = path.join(preparedDir, `${sha256}.jpg`);
        await sharp(uploadPath).autoOrient()
          .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 90 }).toFile(preparedPath);
        uploadPath = preparedPath;
        logger.info(`Prepared upload copy for ${product.sku}; original retained.`);
      }
      let result;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          result = await cloudinary.uploader.upload(uploadPath, {
            public_id: publicId, resource_type: 'image', overwrite: false,
            tags: ['rabbit-catalog', product.gender.toLowerCase()], timeout: 120000,
            transformation: [{ width: 2400, height: 2400, crop: 'limit' }, { quality: 'auto' }],
          });
          break;
        } catch (error) {
          if (attempt === 3 || (error.http_code >= 400 && error.http_code < 500 && error.http_code !== 429)) throw error;
        }
      }
      if (!result.secure_url) result = await cloudinary.api.resource(publicId);
      manifest[product.imageFile] = {
        sha256, cloud_name: process.env.CLOUDINARY_CLOUD_NAME, public_id: result.public_id,
        secure_url: result.secure_url,
        delivery_url: cloudinary.url(result.public_id, { secure: true, version: result.version, format: result.format,
          transformation: [{ width: 1000, height: 1400, crop: 'limit' }, { quality: 'auto', fetch_format: 'auto' }] }),
        width: result.width, height: result.height, bytes: result.bytes,
      };
      fs.writeFileSync(`${manifestPath}.tmp`, JSON.stringify(manifest, null, 2) + '\n');
      fs.renameSync(`${manifestPath}.tmp`, manifestPath);
      logger.info(`[${++completed}/${products.length}] Uploaded ${product.sku}`);
    } catch (error) {
      failures.push(product.imageFile);
      logger.error({ err: error, sku: product.sku }, 'Image upload failed');
    }
  }
  if (failures.length) throw new Error(`${failures.length} uploads failed; successful uploads saved. Re-run to resume.`);
  logger.info(`Ready: ${completed} product images.`);
}
main().catch(error => { logger.error({ err: error }, 'Catalog operation failed'); process.exitCode = 1; });
