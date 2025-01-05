// pages/api/bookings/createBooking.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/createBooking", req.body);
      return res.status(201).json(response.data);
    } catch (error) {
      return res.status(500).json({ message: "Error creating booking", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
