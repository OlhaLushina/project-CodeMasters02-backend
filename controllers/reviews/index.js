const { ctrlWrapper } = require("../../helpers");
const getAll = require("./getAll");
const getOwn = require("./getOwn");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOwn: ctrlWrapper(getOwn),
};
