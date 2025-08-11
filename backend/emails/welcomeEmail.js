const createWelcomeEmail = (name, email) => {
  return {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🎉 Welcome to Rabbit - Your Premium Clothing Journey Begins!",
    text: `Dear ${name},

Welcome to Rabbit! 🐰✨

Your premium clothing journey starts now. We're thrilled to have you join our community of fashion enthusiasts who appreciate quality, style, and comfort.

Your account has been successfully created with email: ${email}

🌟 What awaits you at Rabbit:
• Curated collections of premium clothing for every occasion
• Exclusive access to new arrivals and seasonal trends
• Personalized recommendations based on your style preferences
• Secure shopping with multiple payment options
• Fast, reliable shipping and hassle-free returns
• VIP access to sales and special promotions

🎯 Ready to elevate your wardrobe?
Start exploring our collections at: [Your Website URL]

💡 Pro Tips:
- Complete your profile to get personalized recommendations
- Follow us on social media for style inspiration
- Sign up for our newsletter to be first to know about new arrivals

If you have any questions or need style advice, our fashion experts are here to help!

Welcome to the Rabbit family! 🐰

Best regards,
The Rabbit Team
Premium Clothing Store

P.S. Don't forget to check out our new arrivals - they're absolutely stunning! ✨`
  };
};

module.exports = createWelcomeEmail;
