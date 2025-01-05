import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/delete/${id}`);
      return res.status(200).json({ message: "Booking deleted successfully", data: response.data });
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      return res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
