const createPaymentReceiptEmail = (userName, userEmail, order) => {
  const subject = `💳 Payment Receipt - Thank You for Your Payment!`;
  const { _id, totalPrice, paymentMethod, paidAt } = order;
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Receipt</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; color: #2c3e50; margin: 0; padding: 0; }
        .container { max-width: 650px; margin: 30px auto; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
        .receipt-summary { padding: 40px 30px; }
        .receipt-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .receipt-table th, .receipt-table td { text-align: left; padding: 8px 12px; }
        .receipt-table th { background: #f8f9fa; color: #28a745; font-size: 15px; }
        .footer { text-align: center; padding: 30px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
        .footer p { margin: 8px 0; font-size: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Received</h1>
          <p>Thank you, ${userName}, for your payment!</p>
        </div>
        <div class="receipt-summary">
          <h2 style="color: #28a745;">Payment Details</h2>
          <table class="receipt-table">
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>${_id}</td>
              </tr>
              <tr>
                <th>Payment Amount</th>
                <td>$${totalPrice}</td>
              </tr>
              <tr>
                <th>Payment Method</th>
                <td>${paymentMethod}</td>
              </tr>
              <tr>
                <th>Payment Date</th>
                <td>${paidAt ? new Date(paidAt).toLocaleString() : '-'}</td>
              </tr>
            </tbody>
          </table>
          <p style="margin-top: 30px; font-size: 17px; color: #34495e;">If you have any questions about your payment or order, reply to this email or contact our support team.</p>
        </div>
        <div class="footer">
          <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
          <p>Thank you for your trust in us!</p>
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

module.exports = createPaymentReceiptEmail;
