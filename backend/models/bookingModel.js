import mongoose from "mongoose";

// Define the schema
const bookingSchema = new mongoose.Schema(
  {
    date: {
      type: Date, // Store full Date object (date + time if needed)
      required: true,
    },
    time: {
      type: String, // Format: HH:mm (if storing separately from date)
      required: true,
      match: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, // Validates 24-hour time format
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the model
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
