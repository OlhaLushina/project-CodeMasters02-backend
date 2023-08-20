const { isLaterTime, HttpError, ctrlWrapper } = require("../../helpers");
const { Task } = require("../../models/task");

const addTask = async (req, res) => {
  const { _id: owner } = req.user;
  const { start, end } = req.body;

  if (!isLaterTime(start, end)) {
    throw HttpError(400, "Start time can't be in later then end time");
  }

  const newTask = await Task.create({ ...req.body, owner });

  res.status(201).json(newTask);
};

module.exports = { addTask: ctrlWrapper(addTask) };
