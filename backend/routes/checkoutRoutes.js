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
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice, guestId } = req.body;

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
        userId = decoded.id;
      } catch (tokenErr) {
        // Token is invalid, treat as guest user
        console.log("Invalid token, proceeding as guest checkout");
      }
    }

    // Create checkout data
    const checkoutData = {
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    };

    // If authenticated user, add user ID; if guest, add guest ID
    if (userId) {
      checkoutData.user = userId;
    } else if (guestId) {
      checkoutData.guestId = guestId;
    } else {
      return res.status(400).json({ message: "Either user authentication or guest ID required" });
    }

    // Create a new checkout session
    const newCheckout = await Checkout.create(checkoutData);
    res.status(201).json(newCheckout);
  } catch (err) {
    console.error("Error creating checkout session: ", err);
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
      // Create final order based on the checkout details
      const orderData = {
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
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

      const finalOrder = await Order.create(orderData);

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