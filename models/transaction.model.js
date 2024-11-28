import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        bookingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: true
        },
        banks :{
            type: String,
            required: true
        },
        refereceId : {
            type: String,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['credit', 'debit'],
            default: 'credit'
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        }
    },{timestamps: true}
)

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction;