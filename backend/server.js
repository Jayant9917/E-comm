const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const UserRoutes = require("./routes/UserRoutes");
const ProductRoutes = require("./routes/productRoutes");
const CartRoutes = require("./routes/cartRoutes");
const CheckoutRoutes = require("./routes/checkoutRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const SubscriberRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();
app.use(express.json());

// Configure CORS with a dynamic origin whitelist and preflight support
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://e-comm-rabbit.vercel.app',
  'https://e-comm-h265.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow Vercel preview deployments for the frontend project
    const vercelPreviewPattern = /^https:\/\/e-comm-rabbit-[a-z0-9-]+\.vercel\.app$/i;
    if (vercelPreviewPattern.test(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Serve static images from the images folder
app.use("/images", express.static(path.join(__dirname, "images")));

const PORT = process.env.PORT || 5000;

// connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// API Routes
app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", SubscriberRoute);

//Admin Routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
