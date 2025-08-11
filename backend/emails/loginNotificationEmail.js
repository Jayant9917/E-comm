const createLoginNotificationEmail = (name, email) => {
  return {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🔐 Security Alert - New Login to Your Rabbit Account",
    text: `Hello ${name},

🔐 Security Alert - Rabbit Account Access

We're writing to inform you about a new login to your Rabbit premium clothing account.

📅 Login Time: ${new Date().toLocaleString()}
🌐 Account Email: ${email}
🏠 Store: Rabbit Premium Clothing

✅ This login was successful and authorized from your account.

🔒 Your Account Security Status:
• Login: Successful
• Account: Active and Secure
• Session: Valid

⚠️  IMPORTANT SECURITY REMINDERS:
If this login attempt was not made by you, please take immediate action:

1. 🔑 Change your password immediately
2. 📱 Enable two-factor authentication (2FA)
3. 📞 Contact our security team at security@rabbit.com
4. 🚫 Review and revoke any suspicious sessions

🛡️  Enhanced Security Features Available:
• Two-factor authentication (SMS/Email)
• Login activity monitoring
• Suspicious activity alerts
• Secure password requirements

💡 Security Best Practices:
- Use a unique, strong password for Rabbit
- Never share your login credentials
- Log out from shared devices
- Regularly review your account activity

For immediate security assistance:
📧 Email: security@rabbit.com
📞 Phone: +1-800-RABBIT-1
🌐 Live Chat: Available 24/7 on our website

Your security is our top priority. Thank you for choosing Rabbit!

Stay stylish and secure! 🐰✨

Best regards,
The Rabbit Security Team
Premium Clothing Store

---
This is an automated security notification. If you have any concerns, please contact us immediately.`
  };
};

module.exports = createLoginNotificationEmail;
