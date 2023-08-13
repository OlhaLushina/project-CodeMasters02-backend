const { Review } = require("../../models/review");
const { ctrlWrapper } = require("../../helpers");

//Повертає всі відгуки

const getAllReviews = async (req, res) => {
  const allReviews = await Review.find()
    .sort({
      createdAt: -1,
    })
    .populate("owner", "name avatar");

  res.json(allReviews);
};

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
};
