import express from "express";
import { createBooking, getBookings, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post('/createBooking', createBooking);
router.get('/getBooking', getBookings);
router.delete('/delete/:id', deleteBooking);

export default router;