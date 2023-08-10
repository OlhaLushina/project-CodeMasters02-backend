const { Review } = require("../../models/review");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getOwn = async (req, res) => {
  const { _id: owner } = req.user;

  const ownReview = Review.find(owner);

  req.json({
    ownReview,
  });
};

module.exports = getOwn;
