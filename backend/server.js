const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/productRoutes');
const CartRoutes = require('./routes/cartRoutes');
const CheckoutRoutes = require('./routes/checkoutRoutes');
const OrderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const SubscriberRoute = require('./routes/subscribeRoute');
const adminRoutes = require('./routes/adminRoutes');
const productAdminRoutes = require('./routes/productAdminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static images from the images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT;

// connect to MongoDB
connectDB();


app.get("/", (req, res) => {
    res.send("Hello World");
});

// API Routes
app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/cart', CartRoutes);
app.use('/api/checkout', CheckoutRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', SubscriberRoute);

//Admin Routes
app.use('/api/admin/users', adminRoutes);
app.use('/api/admin/products', productAdminRoutes);
app.use('/api/admin/orders', adminOrderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
