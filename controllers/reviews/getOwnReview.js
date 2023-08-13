const { Review } = require("../../models/review");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getOwnReview = async (req, res) => {
  const { _id: owner } = req.user;

  const ownReview = await Review.findById(owner) || {};

  if (!ownReview) {
    throw HttpError(404, "Not found");
  }

  res.json({
    "rating": ownReview.rating,
    "text": ownReview.text
  });
};

module.exports = {
  getOwnReview: ctrlWrapper(getOwnReview),
}
