import { optional, z } from "zod";
import Transaction from "../models/transaction.model.js";
import Booking from "../models/booking.model.js";

const getSpecificTransaction = async (req, res) => {
  const { id } = req?.params;
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return res
      .status(400)
      .json({ status: "error", message: "No Transaction found" });
  }

  return res.status(200).json({ status: "success", transaction: transaction });
};

const getTransaction = async (req, res) => {
  const transaction = await Transaction.find({});
  if (transaction <= 1) {
    return res
      .status(400)
      .json({ status: "error", message: "No Transaction found" });
  }

  return res.status(200).json({ status: "success", transaction: transaction });
};

const createTransaction = async (req, res) => {
  const body = req?.body;
  const userId = req?.user;
//   console.log(userId);
//   console.log(body);
  const transactionSchema = z.object({
    banks: z.string(),
    refereceId: z.string(),
    mode: z.string(),
    amount: z.number(),
    type: z.string().optional(),
    status: z.string().optional(),
  });

  const validate = transactionSchema.safeParse(req.body);
  if (!validate.success) {
    return res
      .status(400)
      .json({ error: "Bad request", message: "Required field is missing" });
  }
  // if()
    const transaction = await Transaction.create({
      userInfo: userId,
      bookingId: body.bookingId,
      banks: body.banks,
      refereceId: body.refereceId,
      mode: body.mode,
      amount: body.amount,
      type: body.type,
      status: body.status,
    });

  const booking = await Booking.findByIdAndUpdate(body.bookingId, {transactionInfo: transaction._id} )

  return res.status(200).json({
    status: "success",
    message: "create new Transaction",
    transaction: transaction,
  });
};

const deleteTransaction = async (req, res) => {
  const { id } = req?.params;
  const transaction = await Transaction.findByIdAndDelete(id);
  return res
    .status(200)
    .json({
      status: "success",
      message: "delete transaction",
      transaction: transaction,
    });
};

const updateTransaction = async (req, res) => {
  const { id } = req?.params;
  const body = req?.body;
  const userId = req?.user;
  const transactionSchema = z.object({
    banks: z.string(),
    amount: z.number(),
    refereceId: z.string(),
    mode: z.string(),
    type: z.string().optional(),
    status: z.string().optional(),
  });

  const validate = transactionSchema.safeParse(req.body);

  if (!validate.success) {
    return res
      .status(400)
      .json({ status: "bad request", message: "required all field" });
  }

  const transaction = await Transaction.findByIdAndUpdate(
    id,
    {
      userInfo: userId,
      bookingInfo: body.bookingId,
      banks: body.banks,
      mode: body.mode,
      amount: body.amount,
      refereceId: body.refereceId,
      status: body.status,
      type: body.type,
    },
    { new: true }
  );

  return res
    .status(200)
    .json({
      status: "success",
      message: "update transaction",
      transaction: transaction,
    });
};

export {
  getTransaction,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getSpecificTransaction,
};
