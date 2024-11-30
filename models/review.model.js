import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userInfo: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    hotel: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Hotel",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema)

export default Review
