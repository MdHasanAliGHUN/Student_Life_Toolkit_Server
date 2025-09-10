const express = require("express");
const {
  addANewGoal,
  getAllGoals,
  addATask,
  toggleTaskCompletion,
  handleDeleteGoal,
} = require("../controllers/studyPlannerControllers");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("From Study Planner Route");
});

//ADD A NEW GOAD
router.post("/add-goal", addANewGoal);

//GET ALL GOALS
router.get("/get-goals", getAllGoals);

//ADD A TASK TO A GOAL
router.post("/add-task/:goalId", addATask);


// UPDATE A TASK'S 
router.patch("/update-task/:goalId/:taskId", toggleTaskCompletion);

// DELETE A GOAL
router.delete("/delete-goal/:goalId", handleDeleteGoal);

module.exports = router;
