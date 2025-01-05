// pages/api/bookings/getBookings.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Use environment variable for backend URL (local or production)
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"; // Default to localhost for local development

      // Fetch bookings from the backend API
      const response = await axios.get(`${apiUrl}/api/bookings/getBooking`);
      
      const currentDate = new Date();

      // Filter bookings to only show future ones
      const filteredBookings = response.data.filter((booking) => {
        if (!booking.date || !booking.time) return false;

        // Combine date and time into a single Date object
        const bookingDateTime = new Date(`${new Date(booking.date).toISOString().split("T")[0]}T${booking.time}`);
        return bookingDateTime > new Date(); // Compare with the current date and time
      });

      console.log("Filtered bookings:", filteredBookings);
      return res.status(200).json(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      return res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
