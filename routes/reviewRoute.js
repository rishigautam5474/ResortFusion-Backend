import express from "express";
import { getAllReview, getSpecificReview } from "../controller/reviewController.js";

const router = express.Router();

router.get("/", getAllReview);
router.get("/:id", getSpecificReview);

export default router;