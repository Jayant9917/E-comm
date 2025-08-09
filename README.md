# Rabbit - E-commerce Website

A modern, responsive e-commerce platform built with React.js and Node.js, featuring a comprehensive admin dashboard, user management, and seamless shopping experience.

## 🚀 Features

### Customer Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Browsing**: Browse products by category (Men, Women, Top Wear, Bottom Wear)
- **Product Details**: Comprehensive product information with image galleries
- **Shopping Cart**: Add/remove items with quantity controls
- **User Authentication**: Login and registration system
- **Order Management**: Track order history and status
- **Search Functionality**: Find products quickly with search bar
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu

### Admin Features
- **Dashboard**: Comprehensive admin overview
- **User Management**: View and manage user accounts
- **Product Management**: Add, edit, and delete products
- **Order Management**: Process orders and update statuses
- **Shop Management**: Manage shop settings and inventory

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (implied from structure)

## 📱 Screenshots

### Homepage
![Homepage](./frontend/src/assets/Screenshot%20(109).png)

The homepage features a stunning hero section with vacation-ready imagery, showcasing beach scenes with people enjoying outdoor dining. The design includes:
- Promotional banner with worldwide shipping message
- Clean navigation with brand logo and category links
- Hero section with "VACATION READY" messaging
- Call-to-action "Shop Now" button

### Product Details
![Product Details](./frontend/src/assets/Screenshot%20(110).png)

The product detail page displays:
- Large product images with thumbnail navigation
- Product information (name, price, description)
- Color and size selection options
- Quantity controls with add/remove buttons
- Add to cart functionality
- Product characteristics (brand, material)

### Admin Dashboard
![Admin Dashboard](./frontend/src/assets/Screenshot%20(111).png)

The admin dashboard provides comprehensive management tools:
- User management interface
- Product management system
- Order tracking and status updates
- Shop settings and inventory control

## 🏗️ Project Structure

```
E-comm/
├── backend/                 # Node.js backend
│   ├── controllers/         # API route handlers
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Admin/      # Admin dashboard components
│   │   │   ├── Cart/       # Shopping cart components
│   │   │   ├── Common/     # Shared components (Header, Navbar)
│   │   │   ├── Layout/     # Layout components
│   │   │   └── Products/   # Product-related components
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Images and static files
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-comm
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm start
   ```

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🔧 Available Scripts

### Backend
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build

## 🎨 Key Components

### Navigation
- **Header**: Top promotional banner and main navigation
- **Navbar**: Brand logo, category links, and user actions
- **Mobile Navigation**: Responsive hamburger menu for mobile devices

### Admin Dashboard
- **AdminLayout**: Main admin layout with sidebar navigation
- **AdminSidebar**: Navigation menu for admin functions
- **UserManagement**: Manage user accounts and permissions
- **ProductManagement**: Add, edit, and delete products
- **OrderManagement**: Process and track customer orders

### Shopping Experience
- **ProductGrid**: Display products in responsive grid layout
- **ProductDetails**: Detailed product view with purchase options
- **CartDrawer**: Shopping cart sidebar with checkout functionality
- **Checkout**: Complete purchase process

## 🌟 Features in Detail

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint-based responsive layouts
- Touch-friendly mobile navigation
- Optimized for all device sizes

### User Experience
- Intuitive navigation structure
- Fast loading with Vite
- Smooth animations and transitions
- Accessible design patterns

### Admin Capabilities
- Real-time order status updates
- Bulk product management
- User role management
- Comprehensive analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- Unsplash for high-quality stock images
- All contributors who helped build this project

---

**Built with ❤️ using React.js and Node.js**