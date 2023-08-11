const { HttpError } = require("../../helpers");
const { Review } = require("../../models/review");

const deleteReview = async (req, res) => {
  const { _id: owner } = req.user;

  const deletedReview = await Review.findOneAndRemove({ owner });

  if (!deletedReview) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "delete success" });
};

module.exports = deleteReview;
