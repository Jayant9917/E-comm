// Products resolve exclusively to the uploaded Cloudinary image manifest.
// Run npm run catalog:upload before loading this module for the first time.
module.exports = require('../scripts/catalog').buildProducts();
