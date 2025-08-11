const express = require("express");
const Product = require("../models/Product");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");
const transporter = require("../config/nodemailer");
const { createProductCreatedEmail, createProductUpdatedEmail, createProductDeletedEmail } = require("../emails");

const router = express.Router();

// Helper function to send product notification emails
const sendProductNotification = async (adminId, action, productName, productDetails = {}) => {
  try {
    const admin = await User.findById(adminId);
    if (admin) {
      let mailOptions;
      
      switch (action) {
        case 'Created':
          mailOptions = createProductCreatedEmail(admin.name, productName, productDetails);
          break;
        case 'Updated':
          mailOptions = createProductUpdatedEmail(admin.name, productName, productDetails);
          break;
        case 'Deleted':
          mailOptions = createProductDeletedEmail(admin.name, productName);
          break;
        default:
          return;
      }
      
      await transporter.sendMail({
        ...mailOptions,
        to: admin.email
      });
      console.log(`Product ${action} notification email sent to ${admin.email}`);
    }
  } catch (error) {
    console.log(`Error sending product ${action} notification email:`, error);
  }
};

// @route Post /api/products
// @desc Create a new product
// @access Private
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      image,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      image,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // Reference to the admin user who created it
    });

    const createdProduct = await product.save();
    
    // Send product creation notification email
    await sendProductNotification(
      req.user._id, 
      'Created', 
      createdProduct.name, 
      {
        sku: createdProduct.sku,
        category: createdProduct.category,
        price: createdProduct.price,
        countInStock: createdProduct.countInStock,
        isPublished: createdProduct.isPublished
      }
    );

    res.status(201).json(createdProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// @route PUT /api/products/:id
// @desc Update an exisiting product ID
// @access Private
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      image,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    // Find the product by Id
    const product = await Product.findById(req.params.id);

    if (product) {
      //Update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.image = image || product.image;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the updated product
      const updatedProduct = await product.save();
      
      // Send product update notification email
      await sendProductNotification(
        req.user._id, 
        'Updated', 
        updatedProduct.name, 
        {
          sku: updatedProduct.sku,
          category: updatedProduct.category,
          price: updatedProduct.price,
          countInStock: updatedProduct.countInStock,
          isPublished: updatedProduct.isPublished
        }
      );

      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "No product found with that ID" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
// @desc Delete an existing product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find the product by Id
    const product = await Product.findById(req.params.id);

    if (product) {
      // Send product deletion notification email before deleting
      await sendProductNotification(
        req.user._id, 
        'Deleted', 
        product.name
      );

      // Remove the product from DB
      await product.deleteOne();
      res.json({
        message: "Product removed",
      });
    } else {
      res.status(404).json({
        message: "No product found with that ID",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collections,
      sizes,
      colors,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // Filter Logic
    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.collections = collections;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (sizes) {
      query.sizes = { $in: sizes.split(",") };
    }

    if (colors) {
      query.colors = { $in: [colors] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }
    // Fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with the highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No Best Seller Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try{
    //Fetch atleast 8 products
    const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
    res.json(newArrivals);
  }catch(err){
    console.error(err);
    res.status(500).send("Server Error");
  }
})


// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, //Exclude the current product
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
