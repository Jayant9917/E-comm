const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders(Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order details(Admin only)
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const updateFields = {
      status: req.body.status
    };

    // Set delivery fields if status is "Delivered"
    if (req.body.status === "Delivered") {
      updateFields.isDelivered = true;
      updateFields.deliveredAt = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { 
        new: true, 
        runValidators: false // Skip validation to avoid shippingAddress issues
      }
    ).populate("user", "name email");

    if (updatedOrder) {
      res.json({ message: "Order updated successfully", order: updatedOrder });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete order(Admin only)
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({ message: "Order deleted successfully" });
        }else{
            res.status(404).json({ message: "Order not found" });
        }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }   
});

module.exports = router;
