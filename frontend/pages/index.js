// pages/index.js
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";

const Home = () => {
  return (
    <div>
      <BookingForm />
      <BookingList />
    </div>
  );
};

export default Home;
