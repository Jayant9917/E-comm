const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");
const { getImagesByGender } = require("./images/imageIndex");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Function to seed data

const seedData = async () => {
  try {
    console.log("🌱 Starting data seeding process...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Product.deleteMany({});
    await User.deleteMany({});
    await Cart.deleteMany({});

    // Create a default admin user
    console.log("👤 Creating admin user...");
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });
    console.log(`✅ Admin user created with ID: ${createdUser._id}`);

    // Assign the default user ID to each product
    const userID = createdUser._id;
    console.log(`📦 Preparing ${products.length} products...`);

    const sampleProducts = products.map((product) => {
      // Determine gender key used by imageIndex (male/female)
      const genderKey = (product.gender || '').toLowerCase().includes('women')
        ? 'female'
        : 'male';
      const genderImages = getImagesByGender(genderKey);
      const defaults = Object.values(genderImages || {});
      const fallbackUrl = defaults && defaults.length > 0 ? defaults[0] : undefined;

      // Ensure images array exists and every image has a url
      let images = Array.isArray(product.images) ? product.images : [];
      if (images.length === 0 && fallbackUrl) {
        images = [
          {
            url: fallbackUrl,
            altText: `${product.name} Image`,
          },
        ];
      } else if (images.length > 0) {
        images = images.map((img, idx) => ({
          ...img,
          url: img && img.url ? img.url : fallbackUrl,
          altText: img && img.altText ? img.altText : `${product.name} Image ${idx + 1}`,
        }));
      }

      return { ...product, user: userID, images };
    });

    // Insert the products into the DB
    console.log("💾 Inserting products into database...");
    await Product.insertMany(sampleProducts);

    console.log("🎉 Products Data seeded successfully!");
    console.log(`📊 Total products created: ${products.length}`);
    console.log(`👤 Admin user: ${createdUser.email} (Password: 123456)`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data: ", err);
    if (err.errors) {
      console.error("🔍 Validation errors:");
      Object.keys(err.errors).forEach((key) => {
        console.error(`  - ${key}: ${err.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedData();
