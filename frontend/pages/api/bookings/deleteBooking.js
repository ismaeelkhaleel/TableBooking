// pages/api/bookings/deleteBooking.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      // Use environment variable for backend URL (local or production)
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"; // Default to localhost for local development
      
      // Make the DELETE request to the backend API
      const response = await axios.delete(`${apiUrl}/api/bookings/delete/${id}`);
      
      return res.status(200).json({ message: "Booking deleted successfully", data: response.data });
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      return res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
