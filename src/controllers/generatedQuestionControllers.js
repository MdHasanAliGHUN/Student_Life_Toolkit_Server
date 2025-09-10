const Question = require("../model/generateQuestionModel");

const generateQuestions = async (req, res) => {
  try {
    const { subject, topic, type, difficulty, number } = req.body;
    
    const questions = await Question.aggregate([
      {
        $match: {
          subject: { $regex: new RegExp(subject, "i") },
          topic: { $regex: new RegExp(topic, "i") },
          type,
          difficulty,
        },
      },
      {
        $sample: {
          size: parseInt(number),
        },
      },
    ]);
    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions were found matching your criteria.",
      });
    }
    res.status(200).json({
      success: true,
      message: "successfuly creaete question",
      questions: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  generateQuestions,
};
