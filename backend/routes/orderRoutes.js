const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged in user's orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    // Find order for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // Sort by most recent orders
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// @route GET /api/orders/:id
// @desc Get order details by id
// @access Private
router.get("/:id", protect, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        //Return the full order details 
        res.json(order);

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router