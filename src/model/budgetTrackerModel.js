const mongoose = require("mongoose");

const BudgetTrackerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BudgetTracker = mongoose.model("BudgetTracker", BudgetTrackerSchema);

module.exports = BudgetTracker;
