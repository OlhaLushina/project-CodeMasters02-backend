const { Review } = require("../../models/review");
const { ctrlWrapper } = require('../../helpers');

const addReview = async (req, res) => {
  const { _id: owner } = req.user;

  const ownReview = await Review.findById(owner) || {};

  // Якшо уже створений відгук, помилка
  if (ownReview) {
    throw HttpError(409, "Review already exists");
  }

  const review = await Review.create({ ...req.body, owner });

  res.status(201).json({
    "rating": review.rating,
    "text": review.text
  });
};

module.exports = {
  addReview: ctrlWrapper(addReview),
}
