const { Task } = require("../../models/task");

const getAllTasksOfMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { dateFrom, dateTo } = req.query;

  console.log(req.query);

  const tasksList = await Task.find({ owner, date: { $gte: dateFrom, $lte: dateTo } });

  res.json(tasksList);
};

module.exports = getAllTasksOfMonth;