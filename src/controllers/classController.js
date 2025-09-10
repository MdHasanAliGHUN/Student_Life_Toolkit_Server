const Class = require("../model/classModel");

// Add a new class
const addANewClass = async (req, res) => {
  try {
    const newClass = new Class({ ...req.body });
    const classSaved = await newClass.save();
    res.status(200).json({
      message: "Class added successfully",
      class: classSaved,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to adding class",
      error: error.message,
    });
  }
};

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json({
      message: "Classes fetched successfully",
      classes: classes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch classes",
      error: error.message,
    });
  }
};

//Get today's classes
const getTodaysClasses = async (req, res) => {
  try {
    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLocaleLowerCase();
    const todaysClasses = await Class.find({ day: today });

    res.status(200).json({
      message: "Today's Classes fetched successfully",
      todaysClasses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Faild to fetch today's classes",
      error: error.message,
    });
  }
};

//Delete a class by id
const deleteAClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Class.findByIdAndDelete(id);
    res.status(200).json({
      message: "Class deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete class",
      error: error.message,
    });
  }
};

module.exports = {
  addANewClass,
  getAllClasses,
  getTodaysClasses,
  deleteAClass,
};
