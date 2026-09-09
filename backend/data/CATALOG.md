# Photo-based demo catalog

The catalog contains one product per local image: 31 in `images/male` and 50 in
`images/female`. `product-catalog.json` explicitly maps each filename to a stable
SKU and individually written product name/description. Descriptions refer to
visible clothing; fabric composition, performance claims and reviews are not
invented. Prices, sizes and the initial stock of 20 per product are sample values,
not verified inventory. These must be reviewed before accepting real sales.

The same street-scene photo occurs in both gender folders. Each file has its own
product as requested, with the description identifying the relevant jacket.

## Upload and seed

From `backend/`:

```sh
npm run catalog:check
npm run catalog:upload
npm run seed:check
npm run seed
npm run catalog:verify
```

Configure `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and
`CLOUDINARY_API_SECRET` in `backend/.env`. Environment variables load before
catalog construction, regardless of the command's working directory.

`cloudinary-images.json` records public asset IDs, original-file hashes, HTTPS
URLs and optimized delivery URLs. It contains no credentials and should be kept
with the catalog. Uploads use deterministic IDs and `overwrite: false`. Every
successful upload is recorded immediately; rerunning resumes completed work.
Cloudinary stores a version limited to 2400 pixels on either side and delivers
an optimized version within 1000 by 1400 pixels. Local originals remain intact.
Files over the 10 MB upload limit are prepared as JPEG copies using Sharp in the
gitignored `.catalog-work/prepared` directory, preserving aspect ratio and orientation.

Seeding validates the complete catalog and image mapping first, saves a local
product backup, then upserts by SKU. It does not delete any collection or reset
existing stock, reviews, product IDs, users, carts or orders. Re-running updates
the seed products' descriptive fields and prices. Products outside this catalog
are left untouched.

If there is no administrator, seeding creates one using `SEED_ADMIN_EMAIL`
(default `admin@example.com`) and `SEED_ADMIN_PASSWORD` (default: a random strong
password). New credentials are saved to `.catalog-work/admin-credentials.json`,
which is gitignored. Existing administrators are reused, never reset. Product
backups under `backups/` are also gitignored. No notification emails are sent.

React displays the stored Cloudinary URLs directly. Backend `/images` hosting
and the old `images/imageIndex.js` mapping are no longer used by the seed catalog.
