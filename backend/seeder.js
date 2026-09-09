const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { root, buildProducts } = require('./scripts/catalog');
const logger = require('./config/logger');
const Product = require('./models/Product');
const User = require('./models/User');

async function seed() {
  const products = buildProducts();
  const validationOwner = new mongoose.Types.ObjectId();
  for (const product of products) await new Product({ ...product, user: validationOwner }).validate();
  if (process.argv.includes('--dry-run')) {
    logger.info(`Validated ${products.length} products with Cloudinary images. No database writes.`);
    return;
  }
  if (!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  try {
    const previous = await Product.find().lean();
    const backupDir = path.join(root, 'backups');
    fs.mkdirSync(backupDir, { recursive: true });
    const backupPath = path.join(backupDir, `products-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(previous, null, 2) + '\n', { flag: 'wx' });
    let owner = await User.findOne({ role: 'admin' }).sort({ createdAt: 1 });
    if (!owner) {
      const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
      if (await User.exists({ email })) throw new Error('Seed admin email belongs to a non-admin; set SEED_ADMIN_EMAIL to another address.');
      const password = process.env.SEED_ADMIN_PASSWORD || crypto.randomBytes(24).toString('base64url');
      const credentialsDir = path.join(root, '.catalog-work');
      fs.mkdirSync(credentialsDir, { recursive: true });
      const credentialPath = path.join(credentialsDir, 'admin-credentials.json');
      fs.writeFileSync(credentialPath, JSON.stringify({ email, password }, null, 2) + '\n', { mode: 0o600 });
      owner = await User.create({ name: 'Rabbit Admin', email, password, role: 'admin' });
      logger.info('Created seed administrator. Credentials saved in backend/.catalog-work/admin-credentials.json (gitignored).');
    }
    // Preserve IDs and never delete users, carts, orders, or other products.
    // Initial stock and reviews are insert-only so re-seeding cannot reset them.
    const operations = products.map(({ countInStock, rating, numReviews, ...product }) => ({
      updateOne: {
        filter: { sku: product.sku },
        update: { $set: product, $setOnInsert: { user: owner._id, countInStock, rating, numReviews } },
        upsert: true,
      },
    }));
    const result = await Product.bulkWrite(operations, { ordered: true });
    const saved = await Product.find({ sku: { $in: products.map(p => p.sku) } }).lean();
    if (saved.length !== products.length) throw new Error('Post-seed product count mismatch.');
    logger.info({ inserted: result.upsertedCount, matched: result.matchedCount,
      catalogProducts: saved.length, men: saved.filter(p => p.gender === 'Men').length,
      women: saved.filter(p => p.gender === 'Women').length,
      totalProducts: await Product.countDocuments(), backup: path.relative(root, backupPath) }, 'Catalog seeded');
  } finally {
    await mongoose.disconnect();
  }
}
seed().catch(error => { logger.error({ err: error }, 'Catalog operation failed'); process.exitCode = 1; });
