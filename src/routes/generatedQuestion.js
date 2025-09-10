const express = require("express");
const { generateQuestions } = require("../controllers/generatedQuestionControllers");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("From Generated Route");
});


router.post("/exam-questions", generateQuestions);

module.exports = router