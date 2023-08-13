const { Review } = require("../../models/review");
const { HttpError, ctrlWrapper } = require('../../helpers');

const editReview = async (req, res) => {
  const { _id: owner } = req.user;

  const editedReview = await Review.findOneAndUpdate({ owner }, req.body, { new: true });

  if (!editedReview) {
    throw HttpError(404, "Not found");
  }

  res.json({ 
    "rating": editedReview.rating,
    "text": editedReview.text
   });
};

module.exports = {
  editReview: ctrlWrapper(editReview),
}
