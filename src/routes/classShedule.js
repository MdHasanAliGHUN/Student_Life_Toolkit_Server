const express = require("express");
const {
  getAllClasses,
  addANewClass,
  deleteAClass,
  getTodaysClasses,
} = require("../controllers/classController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("From class route");
});

// Add a new class
router.post("/add-class", addANewClass);

// Get all classes
router.get("/get-all-classes", getAllClasses);

//Get today's classes
router.get("/get-today-classes", getTodaysClasses);

// Delete a class by ID
router.delete("/delete-class/:id", deleteAClass);

module.exports = router;
