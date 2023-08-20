const { ctrlWrapper } = require("../../helpers");
const { Task } = require("../../models/task");

const getAllTasksOfMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { dateFrom, dateTo } = req.query;

  const startDate = new Date(dateFrom);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(dateTo);
  endDate.setHours(23, 59, 59, 999);

  const tasksList = await Task.find({ owner, date: { $gte: startDate, $lte: endDate } });

  res.json(tasksList);
};

module.exports = {
  getAllTasksOfMonth: ctrlWrapper(getAllTasksOfMonth),
};
