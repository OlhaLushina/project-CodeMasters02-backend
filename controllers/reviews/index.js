const { ctrlWrapper } = require("../../helpers");
const getAllReviews = require("./getAllReviews");
const getOwnReview = require("./getOwnReview");
const addReview = require("./postReview");
const editReview = require("./editReview");
const deleteReview = require("./deleteReview");

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
  getOwnReview: ctrlWrapper(getOwnReview),
  addReview: ctrlWrapper(addReview),
  editReview: ctrlWrapper(editReview),
  deleteReview: ctrlWrapper(deleteReview),
};
