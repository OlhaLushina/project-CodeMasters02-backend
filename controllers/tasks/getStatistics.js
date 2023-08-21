const { ctrlWrapper } = require("../../helpers");
const { Task } = require("../../models/task");

const getStatistics = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  console.log(date);

  const dayStartHours = new Date(date);
  dayStartHours.setHours(0, 0, 0, 0);

  const dayEndHours = new Date(date);
  dayEndHours.setHours(23, 59, 59, 999);

  const monthStart = new Date(date.substring(0, 7));
  monthStart.setDate(1);

  const monthEnd = new Date(date.substring(0, 7));
  monthEnd.setMonth(monthEnd.getMonth() + 1);
  monthEnd.setDate(0);
  monthEnd.setHours(23, 59, 59, 999);

  const tasksByDay = await Task.find({ owner, date: { $gte: dayStartHours, $lte: dayEndHours } });

  const tasksByMonth = await Task.find({ owner, date: { $gte: monthStart, $lte: monthEnd } });

  const tasksToDoByDay = tasksByDay.filter((task) => task.category === "to-do");
  const tasksInProgressByDay = tasksByDay.filter((task) => task.category === "in-progress");
  const tasksDoneByDay = tasksByDay.filter((task) => task.category === "done");

  const tasksToDoByMonth = tasksByMonth.filter((task) => task.category === "to-do");
  const tasksInProgressByMonth = tasksByMonth.filter((task) => task.category === "in-progress");
  const tasksDoneByMonth = tasksByMonth.filter((task) => task.category === "done");

  res.json({
    month: {
      toDo: tasksToDoByMonth.length,
      inProgress: tasksInProgressByMonth.length,
      done: tasksDoneByMonth.length,
    },
    day: {
      toDo: tasksToDoByDay.length,
      inProgress: tasksInProgressByDay.length,
      done: tasksDoneByDay.length,
    },
  });
};

module.exports = {
  getStatistics: ctrlWrapper(getStatistics),
};
