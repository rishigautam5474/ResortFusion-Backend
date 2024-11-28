import express from "express"
const router = express.Router();
import IsAuthentication from "../middleware/isAuthentication.js";
import roomRoute from "./roomRoute.js";
import bookingRoute from "./bookingRoute.js";
import transactionRoute from "./transactionRoute.js";
import { deleteUser, getAllUserDetails, getUserDetails, updateUserDetails } from "../controller/adminController.js";

router.use(IsAuthentication)

router.get('/users', getAllUserDetails);
router.get('/users/:id', getUserDetails);
router.put('/users/:id', updateUserDetails);
router.delete('/users/:id', deleteUser);

// Room Routes
router.use('/room', roomRoute);

// Booking Routes
router.use('/booking', bookingRoute)

router.use('/transaction', transactionRoute)

export default router;