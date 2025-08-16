const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const transporter = require("../config/nodemailer");
const { createAbandonedCartEmail } = require("../emails");

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
    } else {
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
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      // Return empty cart instead of 404 to avoid console errors
      res.json({
        user: userId || undefined,
        guestId: guestId || undefined,
        products: [],
        totalPrice: 0,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        // If guest cart is empty, just delete it and return user cart if exists
        if (userCart) {
          await Cart.findOneAndDelete({ guestId });
          return res.status(200).json(userCart);
        } else {
          await Cart.findOneAndDelete({ guestId });
          return res.status(200).json({ products: [], totalPrice: 0 });
        }
      }

      if (userCart) {
        // Merge the guest cart into the user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex !== -1) {
            // If the product is already in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // If the product is not in the user cart, add it
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + Number(item.price) * Number(item.quantity),
          0
        );
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (err) {
          console.error("Error deleting guest Cart: ", err);
        }

        res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, convert the guest cart to a user cart
        // Create a new cart document for the user
        const newUserCart = new Cart({
          user: req.user._id,
          products: guestCart.products,
          totalPrice: guestCart.totalPrice,
        });

        await newUserCart.save();

        // Remove the guest cart after conversion
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (err) {
          console.error("Error deleting guest Cart: ", err);
        }

        res.status(200).json(newUserCart);
      }
    } else {
      // No guest cart found
      if (userCart) {
        // Return existing user cart
        return res.status(200).json(userCart);
      }
      // Return empty cart
      res.status(200).json({ products: [], totalPrice: 0 });
    }
  } catch (err) {
    console.error("Cart merge error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/cart/abandoned-reminder
// @desc Send abandoned cart reminder email to user (triggered after 24 hours)
// @access Private
router.post("/abandoned-reminder", protect, async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ message: "No active cart found" });
    }

    // Check if cart is older than 24 hours (86400000 milliseconds)
    const cartAge = Date.now() - userCart.updatedAt.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (cartAge < twentyFourHours) {
      return res.status(400).json({
        message: "Cart is not old enough for abandoned cart reminder",
        cartAge: Math.floor(cartAge / (1000 * 60 * 60)) + " hours",
      });
    }

    // Send abandoned cart reminder email
    const mailOptions = createAbandonedCartEmail(
      req.user.name,
      userCart.products,
      userCart.totalPrice
    );

    await transporter.sendMail({
      ...mailOptions,
      to: req.user.email,
    });

    console.log(`Abandoned cart reminder sent to ${req.user.email}`);

    res.json({
      message: "Abandoned cart reminder sent successfully",
      cartItems: userCart.products.length,
      totalPrice: userCart.totalPrice,
      cartAge: Math.floor(cartAge / (1000 * 60 * 60)) + " hours",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
