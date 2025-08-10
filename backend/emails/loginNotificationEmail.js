const createLoginNotificationEmail = (name, email) => {
  return {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🔐 Login Alert - E-Commerce Store",
    text: `Hello ${name},

🔐 Login Alert - E-Commerce Store

You have successfully logged into your E-Commerce Store account.

📅 Login Time: ${new Date().toLocaleString()}
🌐 Device/Location: [Detected automatically]
📧 Account Email: ${email}

✅ This login was successful and authorized.

⚠️  SECURITY NOTICE:
If this login attempt was not made by you, please:
1. Change your password immediately
2. Contact our support team
3. Enable two-factor authentication

For security questions, contact: support@yourstore.com

Happy shopping!
The E-Commerce Store Team`
  };
};

module.exports = createLoginNotificationEmail;
