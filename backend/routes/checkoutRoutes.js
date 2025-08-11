const express = require("express");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const Product = require("../models/Product");
const cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");

// @route POST /api/checkout
// @desc Create a new Checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { CheckoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!CheckoutItems || CheckoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    //Create a new checkout session
    const newCheckout = await Checkout.create({
        user: req.user._id,
        checkoutItems: CheckoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        paymentStatus: "pending",
        isPaid: false,
    });
    console.log(`Checkout created for users: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (err) {
    console.error(err);
  }
});
