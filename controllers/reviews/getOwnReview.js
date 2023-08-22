const { Review } = require("../../models/review");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getOwnReview = async (req, res) => {
  const { _id: owner } = req.user;

  // Шукаємо відгук даного користувача
  const ownReview = await Review.findOne({ owner });

  /*
  if (!ownReview) {
    throw HttpError(404, "Not found");
  }
  */
  const answer = (ownReview) ? {
    rating: ownReview.rating,
    text: ownReview.text,
  } : {};

  res.json(answer);
};

module.exports = {
  getOwnReview: ctrlWrapper(getOwnReview),
};
