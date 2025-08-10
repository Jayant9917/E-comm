const createWelcomeEmail = (name, email) => {
  return {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🎉 Welcome to E-Commerce Store - Your Account is Ready!",
    text: `Dear ${name},

Welcome to E-Commerce Store! 🛍️

Your account has been successfully created with email: ${email}

What you can do now:
✅ Browse our amazing product collection
✅ Add items to your shopping cart
✅ Enjoy secure checkout with multiple payment options
✅ Track your orders in real-time
✅ Get exclusive deals and discounts

Start shopping now at: [Your Website URL]

If you have any questions, feel free to contact our support team.

Best regards,
The E-Commerce Store Team`
  };
};

module.exports = createWelcomeEmail;
