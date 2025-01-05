import { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar"; // Importing react-calendar
import "react-calendar/dist/Calendar.css"; // Importing react-calendar styles

const BookingForm = () => {
  const [date, setDate] = useState(new Date()); // Default date is today
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Regex to validate contact number as a string of 10 digits
  const validateContact = (number) => /^\d{10}$/.test(number);

  // Validate guests input to ensure it's a positive integer
  const validateGuests = (guests) => /^\d+$/.test(guests) && guests > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate contact
    if (!validateContact(contact)) {
      setMessage("Contact number must be a valid 10-digit number.");
      return;
    }

    // Validate guests
    if (!validateGuests(guests)) {
      setMessage("Guests must be a positive number.");
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post("/api/bookings/createBooking", {
        date: date.toISOString().split("T")[0], // Format date to YYYY-MM-DD
        time,
        guests,
        name,
        contact: contact.toString(), // Ensure contact is sent as a string
      });
      setMessage(response.data.message || "Booking created successfully!");
      // Reset the form fields
      setDate(new Date()); 
      setTime("");
      setGuests("");
      setName("");
      setContact("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating booking");
    } finally {
      setLoading(false); // Set loading state to false after request is complete
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Book a Table</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Date</label>
          <div>
            <Calendar onChange={setDate} value={date} /> {/* React Calendar */}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ display: "block", marginTop: "5px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Guests</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
            style={{ display: "block", marginTop: "5px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: "block", marginTop: "5px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            maxLength="10"
            style={{ display: "block", marginTop: "5px", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            opacity: loading ? 0.6 : 1, // Disable button when loading
          }}
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "20px",
            color: message.includes("Error") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default BookingForm;
