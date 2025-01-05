import express from "express";
import mongoose from "mongoose";
import bookingRoutes from "./routes/bookingRoute.js";
import dotenv from "dotenv";  // Import dotenv

dotenv.config();  // Configure dotenv

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); 

app.use('/api/bookings', bookingRoutes);

mongoose.connect(process.env.MONGO_URI)  // Use MONGO_URI from .env
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log('Database connection error', error));
