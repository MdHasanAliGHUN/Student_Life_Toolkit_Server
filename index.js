const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES IMPORT HERE
const classRoutes = require("./src/routes/classShedule.js");
const badgetTracker = require("./src/routes/budgetTracker.js");
const studyPlanner = require("./src/routes/studyPlanner.js");
const generatedQuestion = require("./src/routes/generatedQuestion.js");

//ROUTES USE HERE
app.use("/api/class", classRoutes);
app.use("/api/badget-tracker", badgetTracker);
app.use("/api/study-planner", studyPlanner);
app.use("/api/generated-question", generatedQuestion);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//MONGOSE CONFIGURATION IN HERE
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => console.log("mongodb connected successfuly"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
