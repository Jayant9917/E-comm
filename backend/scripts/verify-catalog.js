const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { root, buildProducts, readManifest } = require('./catalog');
const logger = require('../config/logger');
const Product = require('../models/Product');

async function main() {
  const expected = buildProducts();
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  let saved;
  try {
    saved = await Product.find({ sku: { $in: expected.map(p => p.sku) } }).lean();
    assert.equal(saved.length, expected.length);
    for (const product of expected) {
      const actual = saved.find(p => p.sku === product.sku);
      assert.equal(actual.name, product.name);
      assert.equal(actual.description, product.description);
      assert.equal(actual.gender, product.gender);
      assert.equal(actual.images.length, 1);
      assert.equal(actual.images[0].url, product.images[0].url);
      assert.equal(actual.price, product.price);
    }
  } finally { await mongoose.disconnect(); }

  const assets = Object.values(readManifest());
  let next = 0;
  const failures = [];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < assets.length) {
      const asset = assets[next++];
      try {
        const response = await fetch(asset.delivery_url, { method: 'HEAD', signal: AbortSignal.timeout(30000) });
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) {
          throw new Error(`${response.status}: ${response.headers.get('content-type')}`);
        }
      } catch (error) { failures.push({ publicId: asset.public_id, error: error.message }); }
    }
  }));
  const report = {
    checkedAt: new Date().toISOString(), products: saved.length,
    men: saved.filter(p => p.gender === 'Men').length,
    women: saved.filter(p => p.gender === 'Women').length,
    imagesChecked: assets.length, imageFailures: failures,
  };
  fs.mkdirSync(path.join(root, '.catalog-work'), { recursive: true });
  fs.writeFileSync(path.join(root, '.catalog-work', 'verification.json'), JSON.stringify(report, null, 2) + '\n');
  logger.info(report, 'Catalog verification complete');
  assert.equal(failures.length, 0, 'Some Cloudinary image URLs failed verification.');
}
main().catch(error => { logger.error({ err: error }, 'Catalog operation failed'); process.exitCode = 1; });
