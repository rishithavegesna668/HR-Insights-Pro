
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    department: {
      type: String,
      required: true
    },

    position: {
      type: String,
      required: true
    },

    salary: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },

    joiningDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
