const StudyPlanner = require("../model/studyPlannerModel");

// ADD A NEW GOAL
const addANewGoal = async (req, res) => {
  try {
    const newGoal = new StudyPlanner({ ...req.body });
    const savedGoal = await newGoal.save();
    res.status(200).json({
      message: "Goal added successfully",
      goal: savedGoal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// GET ALL GOALS
const getAllGoals = async (req, res) => {
  try {
    const goals = await StudyPlanner.find();

    const goalsWithTaskCounts = goals.map((goal) => {
      const goalObject = goal.toObject();
      const totalTasks = goalObject.tasks.length;

      const completedTasks = goalObject.tasks.filter(
        (task) => task.isCompleted
      ).length;

      return {
        ...goalObject,
        totalTasks,
        completedTasks,
      };
    });

    res.status(200).json({
      message: "Goals fetched successfully",
      goals: goalsWithTaskCounts, 
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

//ADD A NEW TASK TO A GOAL
const addATask = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { title } = req.body;

    const updatedGoal = await StudyPlanner.findByIdAndUpdate(
      goalId,
      { $push: { tasks: { title: title, isCompleted: false } } },
      { new: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({
      message: "Task added successfully",
      goal: updatedGoal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// TOGGLE TASK COMPLETION STATUS
const toggleTaskCompletion = async (req, res) => {
  try {
    const { goalId, taskId } = req.params;

    const goal = await StudyPlanner.findById(goalId);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    console.log(goal);

    const task = goal.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Toggle the isCompleted status
    task.isCompleted = !task.isCompleted;

    const savedGoal = await goal.save();

    res.status(200).json({
      message: "Task updated successfully",
      goal: savedGoal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const handleDeleteGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const deletedGoal = await StudyPlanner.findByIdAndDelete(goalId);
    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({
      message: "Goal deleted successfully",
      goal: deletedGoal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}


module.exports = {
  addANewGoal,
  getAllGoals,
  addATask,
  toggleTaskCompletion,
  handleDeleteGoal
};
