const { Review } = require("../../models/review");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getOwn = async (req, res) => {
  const { _id: owner } = req.user;

  const ownReview = Review.findById(owner) || {};

  if (!ownReview) {
    throw HttpError(404, "Not found");
  }

  req.json({
    ownReview,
  });
};

module.exports = getOwn;
