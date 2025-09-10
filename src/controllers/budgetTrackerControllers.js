const BudgetTracker = require("../model/budgetTrackerModel");

// ADD A NEW TRANSACTION WITH VALIDATION
const addANewTransaction = async (req, res) => {
  try {
    const { type, amount } = req.body;

    if (type === "expense") {
      const transactions = await BudgetTracker.find();
      const totalIncome = transactions
        .filter((trans) => trans.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpense = transactions
        .filter((trans) => trans.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      const remainingIncome = totalIncome - totalExpense;

      if (amount > remainingIncome) {
        return res.status(400).json({
          message: "Expense cannot be more than available income",
        });
      }
    }

    const newTransaction = new BudgetTracker({ ...req.body });
    const savedTransaction = await newTransaction.save();

    res.status(200).json({
      message: "Transaction added successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET ALL TRANSACTIONS
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await BudgetTracker.find();

    const totalIncome = transactions
      .filter((trans) => trans.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((trans) => trans.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const usedPercentage =
      totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(2) : 0;

    res.status(200).json({
      message: "Transaction fetched successfully",
      transactions,
      totals: {
        totalIncome,
        totalExpense,
        balance,
        usedPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { addANewTransaction, getAllTransactions };
