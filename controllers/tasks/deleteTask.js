const { HttpError, ctrlWrapper } = require("../../helpers");
const { Task } = require("../../models/task");

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndRemove(id);

  if (!deletedTask) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "delete success" });
};

module.exports = {
  deleteTask: ctrlWrapper(deleteTask),
};
