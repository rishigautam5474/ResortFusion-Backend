import express from 'express'
import { createNewBooking, getAllBookingRoute, getBookingRoute, updateBooking, deleteBooking } from '../controller/bookingController.js';

const router = express.Router();

router.get('/listing', getAllBookingRoute);
router.get('/:id', getBookingRoute);
router.post('/create', createNewBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;