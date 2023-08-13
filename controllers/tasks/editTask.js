const { Task } = require("../../models/task");
const { isLaterTime, HttpError } = require("../../helpers");

const editTask = async (req, res) => {
  const { id } = req.params;

  const { start, end } = req.body;

  if (!isLaterTime(start, end)) {
    throw HttpError(400, "Start time can't be in later then end time");
  }

  const editedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

  if (!editedTask) {
    throw HttpError(404, "Not found id");
  }

  res.json(editedTask);
};

module.exports = editTask;
