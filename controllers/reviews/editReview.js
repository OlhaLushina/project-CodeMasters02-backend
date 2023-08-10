const { HttpError } = require("../../helpers");
const { Review } = require("../../models/review");
const { User } = require("../../models/user");

const edit = async (req, res) => {
  const { _id: owner } = req.user;

  const editedReview = await Review.findOneAndUpdate({ owner }, req.body, { new: true });

  if (!editedReview) {
    throw HttpError(404, "Not found");
  }

  res.json({ editedReview });
};

module.exports = edit;
