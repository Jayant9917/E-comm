const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add product to cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // Convert quantity to number to prevent string concatenation
    const numQuantity = Number(quantity);

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if product has images
    if (!product.images || product.images.length === 0) {
      return res.status(400).json({ message: "Product has no images" });
    }

    // Determine if the user is logged in or a guest
    let cart = await getCart(userId, guestId);

    //If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex !== -1) {
        // If the product is already exists, update the quantity with proper math
        const currentQuantity = Number(cart.products[productIndex].quantity);
        cart.products[productIndex].quantity = currentQuantity + numQuantity;
      } else {
        //add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url,
          price: Number(product.price),
          size,
          color,
          quantity: numQuantity,
        });
      }

      // Recalculate the total price (ensure all values are numbers)
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for the guest and user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0]?.url,
            price: Number(product.price),
            size,
            color,
            quantity: numQuantity,
          },
        ],
        totalPrice: Number(product.price) * numQuantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/cart
// @desc Update quantity of a product in the cart for a guest or logged in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex !== -1) {
      // Product was found, update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = Number(quantity);
      } else {
        cart.products.splice(productIndex, 1); // Remove the product from the cart if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(400).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/cart
// @desc Delete a product from the cart for a guest or logged in user
// @access Public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    }else{
      return res.status(404).json({ message: "Product not found in cart" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/cart
// @desc Get logged-in User's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
  
});

module.exports = router;
