const express = require("express");
const Checkout = require("../models/Checkout");
const Order = require("../models/Order");
const Product = require("../models/Product");
const cart = require("../models/Cart");
const { protect } = require("../middleware/authMiddleware");
const transporter = require("../config/nodemailer");
const { createOrderConfirmationEmail, createPaymentReceiptEmail } = require("../emails");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new Checkout session for authenticated users or guests
// @access Public (handles both authenticated and guest users)
router.post("/", async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice, guestId, user } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    let userId = null;
    
    // Check if user is authenticated (has valid token)
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Handle both token structures: decoded.id or decoded.user.id
        if (decoded.id) {
          userId = decoded.id;
        } else if (decoded.user && decoded.user.id) {
          userId = decoded.user.id;
        }
      } catch (tokenErr) {
        // Token is invalid, treat as guest user
      }
    }

    // Determine the final userId (either from token or from request body)
    if (!userId && !guestId) {
      return res.status(400).json({ message: "Either user authentication or guest ID required" });
    }
    
    // If we have a userId from token, use that. Otherwise, use the user field from request body
    const finalUserId = userId || user;

    // Create checkout data
    const checkoutData = {
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false
    };
    
    // If authenticated user, add user ID; if guest, add guest ID
    if (finalUserId) {
      checkoutData.user = finalUserId;
    } else if (guestId) {
      checkoutData.guestId = guestId;
    }

    // Create a new checkout session
    const checkout = new Checkout(checkoutData);
    
    // Validate the checkout before saving
    const validationError = checkout.validateSync();
    if (validationError) {
      return res.status(400).json({ 
        message: "Checkout validation failed", 
        errors: validationError.errors 
      });
    }
    
    await checkout.save();
    res.status(201).json(checkout);
  } catch (err) {
    console.error("❌ Backend: Error creating checkout session:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Public (handles both authenticated and guest users)
router.put("/:id/pay", async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();

      // Send payment receipt email if user exists
      if (checkout.user) {
        const user = await User.findById(checkout.user);
        if (user) {
          const mailOptions = createPaymentReceiptEmail(user.name, user.email, checkout);
          try {
            await transporter.sendMail(mailOptions);
            console.log("Payment receipt email sent to", user.email);
          } catch (emailErr) {
            console.log("Error sending payment receipt email:", emailErr);
          }
        }
      } else if (checkout.shippingAddress?.email) {
        // Send email to guest user
        const mailOptions = createPaymentReceiptEmail(
          `${checkout.shippingAddress.firstName} ${checkout.shippingAddress.lastName}`,
          checkout.shippingAddress.email,
          checkout
        );
        try {
          await transporter.sendMail(mailOptions);
          console.log("Payment receipt email sent to guest:", checkout.shippingAddress.email);
        } catch (emailErr) {
          console.log("Error sending payment receipt email to guest:", emailErr);
        }
      }
      
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid payment status" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after successful confirmation
// @access Public (handles both authenticated and guest users)
router.post("/:id/finalize", async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      // Get user email if this is an authenticated user
      let userEmail = null;
      if (checkout.user) {
        const user = await User.findById(checkout.user);
        if (user) {
          userEmail = user.email;
        }
      }

      // Create final order based on the checkout details
      const orderData = {
        orderItems: checkout.checkoutItems,
        shippingAddress: {
          ...checkout.shippingAddress,
          email: userEmail || checkout.shippingAddress.email // Add email from user or checkout
        },
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      };

      // Add user or guest identifier
      if (checkout.user) {
        orderData.user = checkout.user;
      } else if (checkout.guestId) {
        orderData.guestId = checkout.guestId;
      }

      let finalOrder;
      try {
        finalOrder = await Order.create(orderData);
      } catch (orderErr) {
        console.error("❌ Backend: Error creating order:", orderErr);
        if (orderErr.name === 'ValidationError') {
          return res.status(400).json({ 
            message: "Order validation failed", 
            errors: orderErr.errors 
          });
        }
        return res.status(500).json({ message: "Failed to create order" });
      }

      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete the cart associated with the user or guest
      try {
        if (checkout.user) {
          await cart.findOneAndDelete({ user: checkout.user });
        } else if (checkout.guestId) {
          await cart.findOneAndDelete({ guestId: checkout.guestId });
        }
      } catch (cartError) {
        console.log("Error deleting cart:", cartError);
        // Continue with order creation even if cart deletion fails
      }

      // Send order confirmation email
      if (checkout.user) {
        const user = await User.findById(checkout.user);
        if (user) {
          const mailOptions = createOrderConfirmationEmail(user.name, user.email, finalOrder);
          try {
            await transporter.sendMail(mailOptions);
            console.log("Order confirmation email sent to", user.email);
          } catch (emailErr) {
            console.log("Error sending order confirmation email:", emailErr);
          }
        }
      } else if (checkout.shippingAddress?.email) {
        // Send email to guest user
        const mailOptions = createOrderConfirmationEmail(
          `${checkout.shippingAddress.firstName} ${checkout.shippingAddress.lastName}`,
          checkout.shippingAddress.email,
          finalOrder
        );
        try {
          await transporter.sendMail(mailOptions);
          console.log("Order confirmation email sent to guest:", checkout.shippingAddress.email);
        } catch (emailErr) {
          console.log("Error sending order confirmation email to guest:", emailErr);
        }
      }

      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout already finalized" });
    } else {
      res.status(400).json({ message: "Checkout not paid" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;