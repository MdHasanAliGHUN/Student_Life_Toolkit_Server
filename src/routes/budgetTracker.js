const express = require("express");
const {addANewTransaction, getAllTransactions} = require("../controllers/budgetTrackerControllers.js")
const router = express.Router();

router.get("/", (req, res) => {
  res.send("From Budget Tracker route");
});

// ADD A NEW TRANSACTION
router.post("/add-transaction", addANewTransaction)

//GET ALL TRANSACTIONS
router.get("/all-transactions", getAllTransactions)



module.exports = router;
