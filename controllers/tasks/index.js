const { ctrlWrapper } = require("../../helpers");

const { getAllTasksOfMonth } = require("./getAllTasksOfMonth");
const { addTask } = require("./addTask");
const { editTask } = require("./editTask");
const { deleteTask } = require("./deleteTask");
const { getStatistics } = require("./getStatistics");

module.exports = {
  getAllTasksOfMonth,
  addTask,
  editTask,
  deleteTask,
  getStatistics,
};
