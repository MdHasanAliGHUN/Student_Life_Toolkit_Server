
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
