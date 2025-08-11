const createOrderConfirmationEmail = (userName, userEmail, order) => {
  const subject = `🛍️ Order Confirmation - Thank You for Your Purchase!`;
  const { orderItems, shippingAddress, paymentMethod, totalPrice, _id, createdAt } = order;
  let itemsHtml = '';
  orderItems.forEach(item => {
    itemsHtml += `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.size || '-'}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.color || '-'}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">$${item.price}</td>
      </tr>`;
  });
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #2c3e50; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 30px auto; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
        .order-summary { padding: 40px 30px; }
        .order-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .order-table th, .order-table td { text-align: left; padding: 8px 12px; }
        .order-table th { background: #f8f9fa; color: #667eea; font-size: 15px; }
        .total-row td { font-weight: bold; color: #764ba2; font-size: 18px; }
        .address, .payment { margin-bottom: 18px; }
        .footer { text-align: center; padding: 30px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
        .footer p { margin: 8px 0; font-size: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Order, ${userName}!</h1>
          <p>Your order has been received and is now being processed.</p>
        </div>
        <div class="order-summary">
          <h2 style="color: #667eea;">Order Summary</h2>
          <p><strong>Order ID:</strong> ${_id}</p>
          <p><strong>Order Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
          <table class="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              <tr class="total-row">
                <td colspan="4" style="text-align:right;">Total:</td>
                <td>$${totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <div class="address">
            <h3 style="margin-bottom: 5px; color: #764ba2;">Shipping Address</h3>
            <p>${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}</p>
          </div>
          <div class="payment">
            <h3 style="margin-bottom: 5px; color: #764ba2;">Payment Method</h3>
            <p>${paymentMethod}</p>
          </div>
          <p style="margin-top: 30px; font-size: 17px; color: #34495e;">We appreciate your trust in Rabbit. If you have any questions, reply to this email or contact our support team.</p>
        </div>
        <div class="footer">
          <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
          <p>Thank you for shopping with us!</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return {
    from: process.env.SENDER_EMAIL,
    to: userEmail,
    subject,
    html: emailBody
  };
};

module.exports = createOrderConfirmationEmail;
