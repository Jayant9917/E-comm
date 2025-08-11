const createNewsletterConfirmationEmail = (email) => {
  const subject = `🎉 Welcome to the Rabbit Newsletter!`;
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>Newsletter Subscription Confirmation</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #2c3e50; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 30px auto; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
        .content { padding: 40px 30px; }
        .footer { text-align: center; padding: 30px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
        .footer p { margin: 8px 0; font-size: 15px; }
        .cta { display: inline-block; margin-top: 20px; padding: 14px 28px; background: #667eea; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1>Welcome to the Rabbit Newsletter! 🐰</h1>
        </div>
        <div class='content'>
          <p style='font-size: 20px; color: #764ba2; font-weight: 600;'>Thank you for subscribing!</p>
          <p style='font-size: 17px; color: #34495e;'>
            You’ll now be the first to know about:<br>
            • Exclusive offers and discounts<br>
            • New arrivals and seasonal trends<br>
            • Style inspiration and tips
          </p>
          <p style='margin-top: 25px;'>
            👉 <strong>Add us to your contacts</strong> to make sure you never miss an update.<br>
            Follow us on <a href='#' style='color: #667eea; text-decoration: underline;'>Instagram</a>, <a href='#' style='color: #667eea; text-decoration: underline;'>Facebook</a>, and <a href='#' style='color: #667eea; text-decoration: underline;'>Twitter</a> for even more style inspiration.
          </p>
          <p style='margin-top: 25px;'>If you have any questions, just reply to this email—we’re here to help!</p>
          <a class='cta' href='https://yourwebsite.com'>Start Shopping</a>
        </div>
        <div class='footer'>
          <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
          <p>Welcome to our fashion community!</p>
          <p style='font-size: 13px; color: #ccc;'>You can unsubscribe at any time by clicking the link at the bottom of our emails.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject,
    html: emailBody
  };
};

module.exports = createNewsletterConfirmationEmail;
