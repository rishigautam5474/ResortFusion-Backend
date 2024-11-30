import Review from "../models/review.model.js";

const getAllReview = async (req, res) => {
  const review = await Review.find({});
  if (!review) {
    return res
      .status(400)
      .json({ status: "Error", message: "review not find" });
  }
  return res.status(200).json({ status: "success", review: review });
};

const getSpecificReview = (req, res) => {};

export { getAllReview, getSpecificReview };
