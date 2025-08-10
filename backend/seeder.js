const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

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
    console.log("✅ Existing data cleared");

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
      return { ...product, user: userID };
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
      Object.keys(err.errors).forEach(key => {
        console.error(`  - ${key}: ${err.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedData();