const createLoginNotificationEmail = (name, email) => {
  const loginTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "🎉 Welcome Back! Your Rabbit Account Login Confirmation",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Back to Rabbit!</title>
        <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .content { padding: 30px 25px; }
            .welcome-box { background: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .info-item { background: #f1f3f4; padding: 15px; border-radius: 8px; text-align: center; }
            .security-section { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0; }
            .tip-card { background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; }
            .footer { background: #2c3e50; color: white; padding: 25px; text-align: center; }
            .btn { display: inline-block; background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
            .emoji { font-size: 1.2em; }
            @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐰 Rabbit</div>
                <h1>Welcome Back, ${name}! 🎉</h1>
                <p>Your fashion journey continues...</p>
            </div>
            
            <div class="content">
                <div class="welcome-box">
                    <h2>🎊 Great to See You Again!</h2>
                    <p>We're thrilled you're back! Your Rabbit account was just accessed, and we wanted to give you a friendly heads-up about this login activity.</p>
                </div>

                <h3>📋 Login Details</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="emoji">⏰</div>
                        <strong>Login Time</strong><br>
                        ${loginTime}
                    </div>
                    <div class="info-item">
                        <div class="emoji">📧</div>
                        <strong>Account Email</strong><br>
                        ${email}
                    </div>
                    <div class="info-item">
                        <div class="emoji">✅</div>
                        <strong>Status</strong><br>
                        Successfully Authenticated
                    </div>
                    <div class="info-item">
                        <div class="emoji">🛡️</div>
                        <strong>Security</strong><br>
                        All Systems Green
                    </div>
                </div>

                <div class="security-section">
                    <h3>🔐 Quick Security Check</h3>
                    <p><strong>Was this you?</strong> If yes, you're all set! If not, don't panic - we've got your back:</p>
                    <ul>
                        <li>🔑 <strong>Change your password</strong> immediately</li>
                        <li>📱 <strong>Enable 2FA</strong> for extra protection</li>
                        <li>📞 <strong>Contact us</strong> at security@rabbit.com</li>
                        <li>🔍 <strong>Review recent activity</strong> in your account</li>
                    </ul>
                </div>

                <h3>💡 Pro Security Tips</h3>
                <div class="tips-grid">
                    <div class="tip-card">
                        <h4>🔒 Strong Passwords</h4>
                        <p>Use unique passwords with a mix of letters, numbers, and symbols. Consider a password manager!</p>
                    </div>
                    <div class="tip-card">
                        <h4>🚫 Stay Private</h4>
                        <p>Never share your login details, even with friends. Always log out on shared devices.</p>
                    </div>
                    <div class="tip-card">
                        <h4>👀 Stay Alert</h4>
                        <p>Regularly check your account activity and enable notifications for suspicious behavior.</p>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <h3>🛍️ Ready to Shop?</h3>
                    <p>Discover our latest collections and exclusive deals waiting just for you!</p>
                    <a href="#" class="btn">🛒 Start Shopping</a>
                    <a href="#" class="btn" style="background: #28a745;">👤 Manage Account</a>
                </div>
            </div>

            <div class="footer">
                <h4>🐰 The Rabbit Team</h4>
                <p>Premium Fashion • Secure Shopping • 24/7 Support</p>
                <p>
                    📧 <a href="mailto:support@rabbit.com" style="color: #74b9ff;">support@rabbit.com</a> | 
                    📞 1-800-RABBIT-1 | 
                    💬 Live Chat Available
                </p>
                <p style="font-size: 12px; margin-top: 20px; opacity: 0.8;">
                    This is an automated security notification. For your protection, please don't reply to this email.
                    <br>© 2024 Rabbit Premium Clothing. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>`,
    text: `Hello ${name}! 🎉

Welcome back to Rabbit! We're excited to see you again.

🔐 LOGIN CONFIRMATION
Your Rabbit account was just accessed successfully.

📋 Login Details:
• Time: ${loginTime}
• Email: ${email}
• Status: ✅ Successfully Authenticated
• Security: 🛡️ All Systems Green

🔒 SECURITY CHECK
Was this login you? If yes, you're all set! 
If not, please take these steps immediately:
1. 🔑 Change your password
2. 📱 Enable two-factor authentication
3. 📞 Contact security@rabbit.com
4. 🔍 Review your account activity

💡 SECURITY TIPS
• Use strong, unique passwords
• Never share login credentials
• Log out from shared devices
• Enable account notifications

🛍️ READY TO SHOP?
Discover our latest collections and exclusive deals!

Need help? We're here 24/7:
📧 support@rabbit.com
📞 1-800-RABBIT-1
💬 Live Chat on our website

Stay stylish and secure! 🐰✨

The Rabbit Team
Premium Fashion • Secure Shopping

---
This is an automated security notification. Please don't reply to this email.`
  };
};

module.exports = createLoginNotificationEmail;
