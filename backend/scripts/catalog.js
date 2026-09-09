const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(root, '.env'), quiet: true });
const catalog = require('../data/product-catalog.json');
const manifestPath = path.join(root, 'data/cloudinary-images.json');

function validateCatalog() {
  const files = ['male', 'female'].flatMap(group => fs.readdirSync(path.join(root, 'images', group))
    .filter(name => /\.(jpe?g|png|webp|avif)$/i.test(name)).map(name => `${group}/${name}`));
  const seenFiles = new Set();
  const seenSkus = new Set();
  for (const product of catalog) {
    if (!files.includes(product.imageFile) || seenFiles.has(product.imageFile) || seenSkus.has(product.sku)) {
      throw new Error(`Missing or duplicate image/SKU: ${product.sku}`);
    }
    if (!product.name || !product.description || !Number.isFinite(product.price) || product.price <= 0) {
      throw new Error(`Invalid product details: ${product.sku}`);
    }
    if (product.gender !== (product.imageFile.startsWith('male/') ? 'Men' : 'Women')) {
      throw new Error(`Gender folder mismatch: ${product.sku}`);
    }
    seenFiles.add(product.imageFile);
    seenSkus.add(product.sku);
  }
  if (seenFiles.size !== files.length) throw new Error('Each local image must have exactly one product.');
  return catalog;
}

function readManifest() {
  return fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
}

function imageHash(imageFile) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'images', imageFile))).digest('hex');
}

function buildProducts() {
  const images = readManifest();
  return validateCatalog().map(({ imageFile, ...product }) => {
    const asset = images[imageFile];
    if (!asset || asset.sha256 !== imageHash(imageFile) || !asset.secure_url?.startsWith('https://res.cloudinary.com/')) {
      throw new Error(`Upload missing or changed image first: ${imageFile}`);
    }
    return { ...product, images: [{ url: asset.delivery_url || asset.secure_url, altText: product.name }] };
  });
}

module.exports = { root, catalog, manifestPath, validateCatalog, readManifest, imageHash, buildProducts };
