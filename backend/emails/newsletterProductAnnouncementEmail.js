const createNewsletterProductAnnouncementEmail = (subscriberEmail, product) => {
  const subject = `🆕 New Arrival: ${product.name} is now available at Rabbit!`;
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>New Product Announcement</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #2c3e50; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 30px auto; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
        .product-section { padding: 40px 30px; text-align: center; }
        .product-image { max-width: 250px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(102,126,234,0.12); }
        .product-name { font-size: 26px; color: #764ba2; font-weight: 700; margin-bottom: 10px; }
        .product-desc { font-size: 17px; color: #34495e; margin-bottom: 18px; }
        .product-price { font-size: 22px; color: #28a745; font-weight: 700; margin-bottom: 25px; }
        .cta { display: inline-block; margin-top: 10px; padding: 16px 32px; background: #667eea; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 18px; }
        .footer { text-align: center; padding: 30px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
        .footer p { margin: 8px 0; font-size: 15px; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1>New Arrival at Rabbit! 🐰</h1>
        </div>
        <div class='product-section'>
          <img class='product-image' src='${product.image}' alt='${product.name}' />
          <div class='product-name'>${product.name}</div>
          <div class='product-desc'>${product.description}</div>
          <div class='product-price'>$${product.price}</div>
          <a class='cta' href='https://yourwebsite.com/products/${product._id}'>View Product</a>
        </div>
        <div class='footer'>
          <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
          <p>Thank you for being a valued subscriber!</p>
          <p style='font-size: 13px; color: #ccc;'>You can unsubscribe at any time by clicking the link at the bottom of our emails.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return {
    from: process.env.SENDER_EMAIL,
    to: subscriberEmail,
    subject,
    html: emailBody
  };
};

module.exports = createNewsletterProductAnnouncementEmail;
