const { ctrlWrapper } = require("../../helpers");

const getAllTasksOfMonth = require("./getAllTasksOfMonth");
const addTask = require("./addTask");
const editTask = require("./editTask");
const deleteTask = require("./deleteTask");

module.exports = {
  getAllTasksOfMonth: ctrlWrapper(getAllTasksOfMonth),
  addTask: ctrlWrapper(addTask),
  editTask: ctrlWrapper(editTask),
  deleteTask: ctrlWrapper(deleteTask),
};
