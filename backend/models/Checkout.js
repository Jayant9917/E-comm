const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const CheckoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Make user optional for guest checkouts
    },
    guestId: {
      type: String,
      required: false, // Add guestId for guest checkouts
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Add validation to ensure either user or guestId is provided
CheckoutSchema.pre("save", function (next) {
  if (!this.user && !this.guestId) {
    return next(new Error("Either user or guestId must be provided"));
  }
  next();
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
