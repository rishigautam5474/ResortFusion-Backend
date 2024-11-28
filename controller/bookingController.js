import Booking from "../models/booking.model.js";
import { z } from "zod";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

const getAllBookingRoute = async (req, res) => {
  const booking = await Booking.find({});
  if (!booking) {
    return res
      .status(400)
      .json({ status: "Error", message: "Booking not found" });
  }

  return res.status(200).json({
    status: "success",
    message: "Success find Booking",
    booking: booking,
  });
};

const getBookingRoute = async (req, res) => {
  const { id } = req?.params;
  //   console.log(id);
  const booking = await Booking.findById(id);
  if (!booking) {
    return res
      .status(400)
      .json({ status: "error", message: "Booking not find" });
  }

  return res.status(200).json({ status: "success", booking: booking });
};

const createNewBooking = async (req, res) => {
  const body = req.body;
  const userId = req?.user;
  const bookingSchema = z.object({
    roomNo: z.number(),
    checkoutTime: z.string(),
    checkinTime: z.string(),
  });
  const validate = bookingSchema.safeParse(req.body);
  if (!validate.success) {
    return res
      .status(400)
      .json({ error: "Bad Request", message: "Required field is missing" });
  }
  const booking = await Booking.create({
    roomNo: body.roomNo,
    checkoutTime: body.checkoutTime,
    checkinTime: body.checkinTime,
    userInfo: userId,
  });

  // const query = { userId: userId }; // Document to update
  const update = {
    $push: { bookingId: booking._id }, // Add "newItem" to the `items` array
  };

  const bookingInfo = await User.findByIdAndUpdate(userId, update);

  return res.status(200).json({
    status: "success",
    message: "Create new Booking",
    booking: booking,
  });
};

const updateBooking = async (req, res) => {};

const deleteBooking = async (req, res) => {
  const { id } = req?.params;
  const booking = await Booking.findByIdAndDelete(id);
  const update = {
    $pull: { bookingId : id }, // Remove "itemToRemove" from `items` array
  };

  const result = await User.findByIdAndUpdate(booking.userInfo, update);
  const transaction = await Transaction.findByIdAndDelete(booking.transactionInfo)
  return res.status(200).json({ status: "Success", message: "Delete Booking" });
};

export {
  getBookingRoute,
  getAllBookingRoute,
  createNewBooking,
  updateBooking,
  deleteBooking,
};
