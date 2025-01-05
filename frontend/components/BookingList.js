import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookingList.module.css";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/getBooking");

        const filteredBookings = response.data.filter((booking) => {
          if (!booking.date || !booking.time) return false;
          const bookingDateTime = new Date(
            `${new Date(booking.date).toISOString().split("T")[0]}T${booking.time}`
          );
          return bookingDateTime > new Date();
        });

        setBookings(filteredBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Unable to fetch bookings. Try again later.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/bookings/deleteBooking?id=${id}`);
      if (response.status === 200) {
        setBookings(bookings.filter((booking) => booking._id !== id));
      } else {
        setError("Failed to delete the booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Error deleting booking. Try again later.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upcoming Bookings</h2>
      {loading && <p className={styles.message}>Loading bookings...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && bookings.length === 0 && (
        <p className={styles.message}>No upcoming bookings available.</p>
      )}
      <ul className={styles.list}>
        {bookings.map((booking) => (
          <li key={booking._id} className={styles.card}>
            <div className={styles.details}>
              <p className={styles.name}>
                <strong>{booking.name}</strong>
              </p>
              <p>
                <strong>Date:</strong> {formatDate(booking.date)}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(booking._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
