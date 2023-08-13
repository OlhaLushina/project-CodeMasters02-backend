const { getAllReviews } = require("./getAllReviews");
const { getOwnReview } = require("./getOwnReview");
const { addReview } = require("./addReview");
const { editReview } = require("./editReview");
const { deleteReview } = require("./deleteReview");

module.exports = {
  getAllReviews,
  getOwnReview,
  addReview,
  editReview,
  deleteReview,
};
