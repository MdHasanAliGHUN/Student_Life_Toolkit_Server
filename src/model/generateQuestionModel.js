const mongoose = require("mongoose");


const generateQuestionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["mcq"],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
    },
    correctAnswer: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", generateQuestionSchema);

module.exports = Question;
