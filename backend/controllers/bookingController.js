import Booking from "../models/bookingModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { date, time, guests, name, contact } = req.body;

    // Ensure all fields are present
    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Log request details for debugging
    console.log("Request Body:", req.body);

    // Convert date to a proper Date object for filtering
    const bookingDate = new Date(date);
    const existingBooking = await Booking.findOne({ date: bookingDate, time });

    if (existingBooking) {
      console.log("Slot already booked:", existingBooking);
      return res.status(400).json({ message: "Time slot already booked!" });
    }

    // Save the new booking
    const newBooking = new Booking({
      date: bookingDate, // Ensure date is stored as a Date object
      time,
      guests,
      name,
      contact,
    });

    await newBooking.save();

    return res.status(201).json({ message: "Booking successfully created!" });
  } catch (error) {
    console.error("Error creating booking:", error); // Detailed logging
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const validBookings = bookings.filter((booking) => booking.date && booking.time);
    res.status(200).json(validBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


// Delete a booking by ID
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the booking exists
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
