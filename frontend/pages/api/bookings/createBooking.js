// pages/api/bookings/createBooking.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the backend URL from the environment variable
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"; // Default to localhost for local development

      // Send the POST request to the backend API
      const response = await axios.post(`${apiUrl}/api/bookings/createBooking`, req.body);
      
      return res.status(201).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Error creating booking", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
