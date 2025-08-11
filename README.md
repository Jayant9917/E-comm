# 🐰 Rabbit - Premium Clothing E-commerce Platform

A full-stack, modern e-commerce platform built with React, Node.js, and MongoDB. Rabbit offers a seamless shopping experience with professional email notifications, comprehensive product management, and a beautiful responsive design.

![Rabbit E-commerce](https://img.shields.io/badge/Rabbit-E--commerce%20Platform-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🛍️ **Shopping Experience**
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Product Catalog**: Extensive clothing collection with detailed product pages
- **Advanced Filtering**: Filter by gender, category, price, and more
- **Search Functionality**: Intelligent product search with real-time results
- **Shopping Cart**: Persistent cart with guest and user support
- **Cart Merging**: Seamless cart synchronization when users log in

### 👨‍💼 **Admin Management**
- **Product Management**: Full CRUD operations for products
- **User Management**: Comprehensive user administration
- **Order Management**: Track and manage customer orders
- **Inventory Control**: Stock management and monitoring
- **Admin Dashboard**: Intuitive admin interface

### 📧 **Smart Email System**
- **Welcome Emails**: Professional welcome messages for new users
- **Login Notifications**: Security alerts for account access
- **Product Notifications**: Admin alerts for product changes
  - Product creation confirmations
  - Product update notifications
  - Product deletion confirmations
- **Abandoned Cart Reminders**: Automated 24-hour cart recovery emails
- **Professional Templates**: Beautiful, branded HTML email designs

### 🔐 **Security & Authentication**
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin and user permission system
- **Password Hashing**: Bcrypt encryption for user security
- **Protected Routes**: Secure admin and user endpoints

## 🏗️ **Architecture**

```
E-comm/
├── frontend/                 # React.js Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── assets/         # Images and static files
│   │   └── App.jsx         # Main application component
│   └── package.json
├── backend/                  # Node.js Backend
│   ├── config/             # Configuration files
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & validation
│   ├── emails/             # Email templates
│   └── server.js           # Express server
└── README.md
```

## 🚀 **Technologies Used**

### **Frontend**
- **React 18**: Modern UI framework with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Responsive Design**: Mobile-first approach

### **Backend**
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **Nodemailer**: Email sending functionality
- **Bcryptjs**: Password hashing

### **Email Service**
- **Brevo (SMTP)**: Professional email delivery
- **HTML Templates**: Beautiful, responsive email designs
- **Automated Notifications**: Smart email triggers

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Brevo account for email services

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd E-comm
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/rabbit-store

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Brevo)
SMTP_USER=your-brevo-username
SMTP_PASS=your-brevo-password
SENDER_EMAIL=noreply@yourdomain.com
```

### **3. Frontend Setup**
```bash
cd ../frontend
npm install
```

### **4. Database Seeding**
```bash
cd ../backend
npm run seed
```

### **5. Start Development Servers**
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev
```

## 🌐 **API Endpoints**

### **Authentication Routes**
```
POST /api/users/register     # User registration
POST /api/users/login        # User login
GET  /api/users/profile      # Get user profile
```

### **Product Routes**
```
GET    /api/products         # Get all products
GET    /api/products/:id     # Get single product
POST   /api/products         # Create product (Admin)
PUT    /api/products/:id     # Update product (Admin)
DELETE /api/products/:id     # Delete product (Admin)
```

### **Cart Routes**
```
GET    /api/cart             # Get user cart
POST   /api/cart             # Add item to cart
PUT    /api/cart/:id         # Update cart item
DELETE /api/cart/:id         # Remove cart item
POST   /api/cart/abandoned-reminder  # Send cart reminder
```

## 📧 **Email System**

### **Email Types**
1. **Welcome Email**: Sent when users register
2. **Login Notification**: Security alert for account access
3. **Product Created**: Admin confirmation for new products
4. **Product Updated**: Admin notification for product changes
5. **Product Deleted**: Admin confirmation for product removal
6. **Abandoned Cart**: 24-hour cart recovery reminder

### **Email Features**
- **Professional Design**: Beautiful, branded HTML templates
- **Responsive Layout**: Works on all email clients
- **Rabbit Branding**: Consistent with your e-commerce brand
- **Automated Triggers**: Smart email sending based on actions

## 📱 **Website Screenshots**

### **Homepage**
![Homepage](./frontend/src/assets/Screenshot%20(109).png)

The homepage features a stunning hero section with vacation-ready imagery, showcasing beach scenes with people enjoying outdoor dining. The design includes:
- Promotional banner with worldwide shipping message
- Clean navigation with brand logo and category links
- Hero section with "VACATION READY" messaging
- Call-to-action "Shop Now" button

### **Product Details**
![Product Details](./frontend/src/assets/Screenshot%20(110).png)

The product detail page displays:
- Large product images with thumbnail navigation
- Product information (name, price, description)
- Color and size selection options
- Quantity controls with add/remove buttons
- Add to cart functionality
- Product characteristics (brand, material)

### **Admin Dashboard**
![Admin Dashboard](./frontend/src/assets/Screenshot%20(111).png)

The admin dashboard provides comprehensive management tools:
- User management interface
- Product management system
- Order tracking and status updates
- Shop settings and inventory control

## 🎨 **UI Components**

### **Layout Components**
- **Header**: Navigation and branding
- **Footer**: Site information and links
- **Navbar**: Main navigation menu
- **Topbar**: Secondary navigation and user actions

### **Product Components**
- **ProductGrid**: Display products in grid layout
- **ProductDetails**: Detailed product information
- **FilterSidebar**: Advanced filtering options
- **SortOptions**: Product sorting functionality
- **FeaturedCollection**: Highlighted product sections

### **User Components**
- **CartDrawer**: Shopping cart interface
- **Checkout**: Payment and order processing
- **UserLayout**: User dashboard layout
- **AdminSidebar**: Admin navigation panel

## 🔧 **Configuration**

### **Environment Variables**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/rabbit-store

# JWT Security
JWT_SECRET=your-secret-key-here

# Email (Brevo SMTP)
SMTP_USER=your-brevo-username
SMTP_PASS=your-brevo-password
SENDER_EMAIL=noreply@yourdomain.com
```

### **Database Models**
- **User**: Authentication and profile data
- **Product**: Product catalog and inventory
- **Cart**: Shopping cart management
- **Checkout**: Order processing (future implementation)

## 🚀 **Deployment**

### **Backend Deployment**
```bash
cd backend
npm run build
npm start
```

### **Frontend Deployment**
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

## 🧪 **Testing**

### **Postman Collection**
Import the provided Postman collection for API testing:

**User Registration:**
```json
POST /api/users/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Product Creation (Admin):**
```json
POST /api/products
{
  "name": "Premium T-Shirt",
  "description": "High-quality cotton t-shirt",
  "price": 29.99,
  "category": "Men",
  "countInStock": 100
}
```

## 📱 **Responsive Design**

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive tablet layouts
- **Desktop Experience**: Full-featured desktop interface
- **Cross-Browser**: Compatible with all modern browsers

## 🔒 **Security Features**

- **JWT Authentication**: Secure token-based sessions
- **Password Encryption**: Bcrypt hashing for user passwords
- **Protected Routes**: Role-based access control
- **Input Validation**: Server-side data validation
- **CORS Protection**: Cross-origin request security

## 🚀 **Future Enhancements**

- **Payment Integration**: PayPal, Stripe, and other payment gateways
- **Order Management**: Complete order lifecycle management
- **Inventory Tracking**: Advanced stock management
- **Analytics Dashboard**: Sales and user analytics
- **Multi-language Support**: Internationalization
- **Mobile App**: React Native mobile application

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 **Acknowledgments**

- **React Team**: For the amazing frontend framework
- **Node.js Community**: For the robust backend runtime
- **MongoDB**: For the flexible database solution
- **Tailwind CSS**: For the utility-first CSS framework
- **Brevo**: For reliable email delivery services

---

**🐰 Rabbit E-commerce Platform** - Built with ❤️ and modern web technologies

*Transform your wardrobe with Rabbit's premium clothing collection!*