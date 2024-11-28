// const bcrypt = require
// const mongoose = require("mongoose");

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    bookingId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "booking",
    },
    verification : {
      type: {
        aadharNo : {
          type: Number,
        },
        panCard : {
          type: String,
        }
      }
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)    
}

const User = mongoose.model("User", userSchema);

export default User;