const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// connect to MongoDB
connectDB();


app.get("/", (req, res) => {
    res.send("Hello World");
});

// API Routes
app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
