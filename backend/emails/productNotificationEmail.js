const createProductCreatedEmail = (adminName, productName, productDetails) => {
  const subject = `✨ New Product Added Successfully - ${productName}`;
  
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Created - Rabbit</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c3e50; margin: 0; padding: 0; background: #f8f9fa; }
            .container { max-width: 650px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 40px; text-align: center; position: relative; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 1; }
            .header p { margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; position: relative; z-index: 1; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 15px; position: relative; z-index: 1; }
            .content { padding: 50px 40px; background: #ffffff; }
            .success-badge { display: inline-block; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 12px 28px; border-radius: 30px; font-weight: 600; margin-bottom: 30px; font-size: 16px; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3); }
            .product-card { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 35px; border-radius: 16px; margin: 30px 0; border: 1px solid #e9ecef; position: relative; }
            .product-card::before { content: '🎯'; position: absolute; top: -15px; left: 30px; background: white; padding: 8px 15px; border-radius: 20px; font-size: 18px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .product-title { color: #2c3e50; font-size: 26px; margin-bottom: 25px; font-weight: 700; text-align: center; }
            .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
            .detail-item { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #667eea; }
            .detail-label { font-weight: 600; color: #7f8c8d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .detail-value { color: #2c3e50; font-weight: 600; font-size: 16px; }
            .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
            .status-published { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .status-draft { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
            .footer { text-align: center; padding: 40px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
            .footer p { margin: 8px 0; font-size: 15px; }
            .next-steps { background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border-left: 5px solid #667eea; }
            .next-steps h4 { color: #2c3e50; margin-top: 0; font-size: 20px; }
            .next-steps ul { margin: 15px 0; padding-left: 25px; }
            .next-steps li { margin: 10px 0; color: #34495e; }
            .timestamp { text-align: center; color: #7f8c8d; font-size: 14px; margin: 20px 0; font-style: italic; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐰 Rabbit</div>
                <h1>Product Management</h1>
                <p>Your new product has been successfully added to the catalog</p>
            </div>
            
            <div class="content">
                <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center; font-size: 28px;">Hello ${adminName}! 👋</h2>
                
                <div style="text-align: center;">
                    <div class="success-badge">
                        ✨ Product Successfully Created
                    </div>
                </div>
                
                <p style="font-size: 17px; color: #34495e; margin-bottom: 30px; text-align: center; line-height: 1.8;">
                    Excellent work! You've successfully added a new premium product to your Rabbit clothing collection. 
                    This addition will help expand your catalog and provide customers with more stylish options.
                </p>
                
                <div class="product-card">
                    <h3 class="product-title">${productName}</h3>
                    
                    <div class="detail-grid">
                        <div class="detail-item">
                            <div class="detail-label">Product SKU</div>
                            <div class="detail-value">${productDetails.sku || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Category</div>
                            <div class="detail-value">${productDetails.category || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Price</div>
                            <div class="detail-value">$${productDetails.price || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Stock Level</div>
                            <div class="detail-value">${productDetails.countInStock || 'N/A'} units</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <span class="status-badge ${productDetails.isPublished ? 'status-published' : 'status-draft'}">
                            ${productDetails.isPublished ? '📢 Published' : '📝 Draft Mode'}
                        </span>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h4>🚀 Next Steps to Maximize Success:</h4>
                    <ul>
                        <li><strong>Review & Verify:</strong> Double-check all product details for accuracy</li>
                        <li><strong>Image Enhancement:</strong> Ensure high-quality, professional product photography</li>
                        <li><strong>SEO Optimization:</strong> Add relevant keywords and meta descriptions</li>
                        <li><strong>Collection Placement:</strong> Consider featuring in relevant collections</li>
                        <li><strong>Marketing Prep:</strong> Plan promotional strategies for the new product</li>
                    </ul>
                </div>
                
                <div class="timestamp">
                    Product created on ${new Date().toLocaleString()}
                </div>
            </div>
            
            <div class="footer">
                <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
                <p>This is an automated notification from your product management system.</p>
                <p>Thank you for growing the Rabbit brand! 🚀</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return {
    from: process.env.SENDER_EMAIL,
    subject,
    html: emailBody
  };
};

const createProductUpdatedEmail = (adminName, productName, productDetails) => {
  const subject = `🔄 Product Updated Successfully - ${productName}`;
  
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Updated - Rabbit</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c3e50; margin: 0; padding: 0; background: #f8f9fa; }
            .container { max-width: 650px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 50px 40px; text-align: center; position: relative; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 1; }
            .header p { margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; position: relative; z-index: 1; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 15px; position: relative; z-index: 1; }
            .content { padding: 50px 40px; background: #ffffff; }
            .update-badge { display: inline-block; background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 12px 28px; border-radius: 30px; font-weight: 600; margin-bottom: 30px; font-size: 16px; box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3); }
            .product-card { background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); padding: 35px; border-radius: 16px; margin: 30px 0; border: 1px solid #ffecb3; position: relative; }
            .product-card::before { content: '🔄'; position: absolute; top: -15px; left: 30px; background: white; padding: 8px 15px; border-radius: 20px; font-size: 18px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .product-title { color: #2c3e50; font-size: 26px; margin-bottom: 25px; font-weight: 700; text-align: center; }
            .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
            .detail-item { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #f39c12; }
            .detail-label { font-weight: 600; color: #7f8c8d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .detail-value { color: #2c3e50; font-weight: 600; font-size: 16px; }
            .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 600; font-size: 14px; }
            .status-published { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .status-draft { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
            .footer { text-align: center; padding: 40px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
            .footer p { margin: 8px 0; font-size: 15px; }
            .update-summary { background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border-left: 5px solid #f39c12; }
            .update-summary h4 { color: #2c3e50; margin-top: 0; font-size: 20px; }
            .update-summary ul { margin: 15px 0; padding-left: 25px; }
            .update-summary li { margin: 10px 0; color: #34495e; }
            .timestamp { text-align: center; color: #7f8c8d; font-size: 14px; margin: 20px 0; font-style: italic; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐰 Rabbit</div>
                <h1>Product Management</h1>
                <p>Your product has been successfully updated and refreshed</p>
            </div>
            
            <div class="content">
                <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center; font-size: 28px;">Hello ${adminName}! 👋</h2>
                
                <div style="text-align: center;">
                    <div class="update-badge">
                        🔄 Product Successfully Updated
                    </div>
                </div>
                
                <p style="font-size: 17px; color: #34495e; margin-bottom: 30px; text-align: center; line-height: 1.8;">
                    Fantastic work! You've successfully updated the product details in your Rabbit clothing collection. 
                    These improvements will enhance the customer experience and potentially boost sales.
                </p>
                
                <div class="product-card">
                    <h3 class="product-title">${productName}</h3>
                    
                    <div class="detail-grid">
                        <div class="detail-item">
                            <div class="detail-label">Product SKU</div>
                            <div class="detail-value">${productDetails.sku || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Category</div>
                            <div class="detail-value">${productDetails.category || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Current Price</div>
                            <div class="detail-value">$${productDetails.price || 'N/A'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Stock Level</div>
                            <div class="detail-value">${productDetails.countInStock || 'N/A'} units</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <span class="status-badge ${productDetails.isPublished ? 'status-published' : 'status-draft'}">
                            ${productDetails.isPublished ? '📢 Published' : '📝 Draft Mode'}
                        </span>
                    </div>
                </div>
                
                <div class="update-summary">
                    <h4>📈 Update Impact Summary:</h4>
                    <ul>
                        <li><strong>Customer Experience:</strong> Updated information provides better product clarity</li>
                        <li><strong>SEO Benefits:</strong> Fresh content can improve search rankings</li>
                        <li><strong>Sales Potential:</strong> Accurate details increase customer confidence</li>
                        <li><strong>Inventory Management:</strong> Current stock levels prevent overselling</li>
                        <li><strong>Brand Consistency:</strong> Maintains high standards across your catalog</li>
                    </ul>
                </div>
                
                <div class="timestamp">
                    Product updated on ${new Date().toLocaleString()}
                </div>
            </div>
            
            <div class="footer">
                <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
                <p>This is an automated notification from your product management system.</p>
                <p>Keep your catalog fresh and engaging! 🌟</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return {
    from: process.env.SENDER_EMAIL,
    subject,
    html: emailBody
  };
};

const createProductDeletedEmail = (adminName, productName) => {
  const subject = `🗑️ Product Removed Successfully - ${productName}`;
  
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Deleted - Rabbit</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c3e50; margin: 0; padding: 0; background: #f8f9fa; }
            .container { max-width: 650px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 50px 40px; text-align: center; position: relative; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 1; }
            .header p { margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; position: relative; z-index: 1; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 15px; position: relative; z-index: 1; }
            .content { padding: 50px 40px; background: #ffffff; }
            .delete-badge { display: inline-block; background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 12px 28px; border-radius: 30px; font-weight: 600; margin-bottom: 30px; font-size: 16px; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3); }
            .product-card { background: linear-gradient(135deg, #fdf2f2 0%, #fde8e8 100%); padding: 35px; border-radius: 16px; margin: 30px 0; border: 1px solid #fecaca; position: relative; }
            .product-card::before { content: '🗑️'; position: absolute; top: -15px; left: 30px; background: white; padding: 8px 15px; border-radius: 20px; font-size: 18px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .product-title { color: #2c3e50; font-size: 26px; margin-bottom: 25px; font-weight: 700; text-align: center; }
            .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; }
            .detail-item { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid #e74c3c; }
            .detail-label { font-weight: 600; color: #7f8c8d; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
            .detail-value { color: #2c3e50; font-weight: 600; font-size: 16px; }
            .footer { text-align: center; padding: 40px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
            .footer p { margin: 8px 0; font-size: 15px; }
            .warning-box { background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border-left: 5px solid #f39c12; }
            .warning-box h4 { color: #856404; margin-top: 0; font-size: 20px; }
            .warning-box ul { margin: 15px 0; padding-left: 25px; }
            .warning-box li { margin: 10px 0; color: #856404; }
            .next-steps { background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); padding: 30px; border-radius: 16px; margin: 30px 0; border-left: 5px solid #667eea; }
            .next-steps h4 { color: #2c3e50; margin-top: 0; font-size: 20px; }
            .next-steps ul { margin: 15px 0; padding-left: 25px; }
            .next-steps li { margin: 10px 0; color: #34495e; }
            .timestamp { text-align: center; color: #7f8c8d; font-size: 14px; margin: 20px 0; font-style: italic; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐰 Rabbit</div>
                <h1>Product Management</h1>
                <p>Product has been successfully removed from your catalog</p>
            </div>
            
            <div class="content">
                <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center; font-size: 28px;">Hello ${adminName}! 👋</h2>
                
                <div style="text-align: center;">
                    <div class="delete-badge">
                        🗑️ Product Successfully Removed
                    </div>
                </div>
                
                <p style="font-size: 17px; color: #34495e; margin-bottom: 30px; text-align: center; line-height: 1.8;">
                    Confirmation: The product has been successfully removed from your Rabbit clothing catalog. 
                    This action helps maintain a clean, organized product database.
                </p>
                
                <div class="product-card">
                    <h3 class="product-title">${productName}</h3>
                    
                    <div class="detail-grid">
                        <div class="detail-item">
                            <div class="detail-label">Action Taken</div>
                            <div class="detail-value">Product Deleted</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Removed By</div>
                            <div class="detail-value">${adminName}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Removal Date</div>
                            <div class="detail-value">${new Date().toLocaleDateString()}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Removal Time</div>
                            <div class="detail-value">${new Date().toLocaleTimeString()}</div>
                        </div>
                    </div>
                </div>
                
                <div class="warning-box">
                    <h4>⚠️ Important Reminders:</h4>
                    <ul>
                        <li><strong>Permanent Action:</strong> This deletion cannot be undone</li>
                        <li><strong>Customer Impact:</strong> Product is no longer visible to customers</li>
                        <li><strong>Order Review:</strong> Check for any active orders containing this product</li>
                        <li><strong>Link Updates:</strong> Update any marketing materials or links</li>
                        <li><strong>Inventory Sync:</strong> Ensure inventory systems are updated</li>
                    </ul>
                </div>
                
                <div class="next-steps">
                    <h4>🔄 Recommended Follow-up Actions:</h4>
                    <ul>
                        <li><strong>Catalog Review:</strong> Assess if a replacement product is needed</li>
                        <li><strong>Marketing Update:</strong> Remove product from promotional materials</li>
                        <li><strong>SEO Cleanup:</strong> Update any related product recommendations</li>
                        <li><strong>Analytics Review:</strong> Monitor impact on overall catalog performance</li>
                        <li><strong>Team Communication:</strong> Inform relevant team members of the change</li>
                    </ul>
                </div>
                
                <div class="timestamp">
                    Product removed on ${new Date().toLocaleString()}
                </div>
            </div>
            
            <div class="footer">
                <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
                <p>This is an automated notification from your product management system.</p>
                <p>Maintain a clean and organized product catalog! 🧹✨</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return {
    from: process.env.SENDER_EMAIL,
    subject,
    html: emailBody
  };
};

const createAbandonedCartEmail = (userName, cartItems, totalPrice) => {
  const subject = "🛒 Your Rabbit Cart is Waiting - Don't Miss Out!";
  
  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complete Your Rabbit Purchase</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c3e50; margin: 0; padding: 0; background: #f8f9fa; }
            .container { max-width: 650px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 40px; text-align: center; position: relative; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>'); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 1; }
            .header p { margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; position: relative; z-index: 1; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 15px; position: relative; z-index: 1; }
            .content { padding: 50px 40px; background: #ffffff; }
            .cart-item { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px; margin: 20px 0; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); display: flex; align-items: center; border: 1px solid #e9ecef; }
            .item-image { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; margin-right: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .item-details { flex: 1; }
            .item-name { font-weight: 700; color: #2c3e50; font-size: 18px; margin-bottom: 8px; }
            .item-specs { color: #7f8c8d; font-size: 15px; margin-bottom: 5px; }
            .item-price { font-weight: bold; color: #667eea; font-size: 20px; font-weight: 700; }
            .total-section { background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%); padding: 35px; border-radius: 16px; margin: 30px 0; text-align: center; border: 2px solid #667eea; position: relative; }
            .total-section::before { content: '💰'; position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: white; padding: 10px 20px; border-radius: 25px; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .cta-button { display: inline-block; padding: 18px 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; margin: 20px 15px; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3); }
            .cta-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); }
            .secondary-button { background: linear-gradient(135deg, #6c757d 0%, #495057 100%) !important; box-shadow: 0 6px 20px rgba(108, 117, 125, 0.3) !important; }
            .footer { text-align: center; padding: 40px; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; }
            .footer p { margin: 8px 0; font-size: 15px; }
            .offer-box { background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); padding: 30px; border-radius: 16px; margin: 30px 0; text-align: center; border: 2px solid #28a745; position: relative; }
            .offer-box::before { content: '🎉'; position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: white; padding: 10px 20px; border-radius: 25px; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .why-rabbit { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 16px; margin: 30px 0; text-align: center; border: 1px solid #e9ecef; }
            .why-rabbit h4 { color: #2c3e50; margin-top: 0; font-size: 20px; }
            .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .feature-item { background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            .feature-icon { font-size: 20px; margin-bottom: 8px; }
            .feature-text { font-size: 14px; color: #34495e; font-weight: 500; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🐰 Rabbit</div>
                <h1>Your Cart is Waiting!</h1>
                <p>Complete your purchase and elevate your style with Rabbit</p>
            </div>
            
            <div class="content">
                <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center; font-size: 28px;">Hello ${userName}! 👋</h2>
                
                <p style="font-size: 17px; color: #34495e; margin-bottom: 30px; text-align: center; line-height: 1.8;">
                    We noticed you left some absolutely stunning Rabbit clothing pieces in your cart! 
                    These carefully selected items are waiting to transform your wardrobe and elevate your style.
                </p>
                
                <h3 style="color: #2c3e50; margin-bottom: 25px; text-align: center; font-size: 22px;">🛍️ Your Curated Cart Items:</h3>`;
  
  // Add cart items
  cartItems.forEach(item => {
    emailBody += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-specs">Size: ${item.size} | Color: ${item.color}</div>
                        <div class="item-specs">Quantity: ${item.quantity}</div>
                    </div>
                    <div class="item-price">$${item.price}</div>
                </div>`;
  });
  
  emailBody += `
                
                <div class="total-section">
                    <h3 style="color: #2c3e50; margin-top: 0; font-size: 28px; font-weight: 700;">Cart Total: $${totalPrice}</h3>
                    <p style="color: #34495e; font-size: 17px; margin: 15px 0;">You have ${cartItems.length} premium item${cartItems.length > 1 ? 's' : ''} ready for checkout!</p>
                </div>
                
                <div class="offer-box">
                    <h4 style="color: #155724; margin-top: 0; font-size: 22px; font-weight: 700;">🎉 Exclusive Limited-Time Offer!</h4>
                    <p style="color: #155724; margin: 15px 0; font-weight: 600; font-size: 18px;">Free Premium Shipping on Orders Over $50!</p>
                    <p style="color: #155724; margin: 10px 0; font-size: 16px;">Plus, enjoy our 30-day hassle-free returns policy</p>
                </div>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="#" class="cta-button">🚀 Complete Purchase Now</a>
                    <a href="#" class="cta-button secondary-button">🛒 View Cart Details</a>
                </div>
                
                <div class="why-rabbit">
                    <h4>🌟 Why Choose Rabbit?</h4>
                    <div class="features-grid">
                        <div class="feature-item">
                            <div class="feature-icon">👕</div>
                            <div class="feature-text">Premium Quality Materials</div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">🚚</div>
                            <div class="feature-text">Fast & Reliable Shipping</div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">💎</div>
                            <div class="feature-text">Exclusive Designer Pieces</div>
                        </div>
                        <div class="feature-item">
                            <div class="feature-icon">🔄</div>
                            <div class="feature-text">30-Day Easy Returns</div>
                        </div>
                    </div>
                </div>
                
                <p style="font-size: 16px; color: #7f8c8d; margin-top: 30px; text-align: center; line-height: 1.6;">
                    <strong>Need Help?</strong> Our style experts are available 24/7 to assist you with any questions about sizing, styling, or your order.
                </p>
            </div>
            
            <div class="footer">
                <p><strong>🐰 Rabbit - Premium Clothing Store</strong></p>
                <p>This email was sent because you have items in your cart.</p>
                <p>Questions? Contact our support team anytime! 💬</p>
            </div>
        </div>
    </body>
    </html>
  `;

  return {
    from: process.env.SENDER_EMAIL,
    subject,
    html: emailBody
  };
};

module.exports = {
  createProductCreatedEmail,
  createProductUpdatedEmail,
  createProductDeletedEmail,
  createAbandonedCartEmail
};
