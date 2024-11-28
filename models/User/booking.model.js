import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    roomNo: {
      type: Number,
      unique: true,
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    transactionInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    },
    checkoutTime: {
      type: String,
      required: true,
    },
    checkinTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking;