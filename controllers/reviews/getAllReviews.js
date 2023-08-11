const { HttpError } = require("../../helpers");
const { Review } = require("../../models/review");

//Повертає всі відгуки

const getAll = async (req, res) => {
  const allReviews = await Review.find()
    .sort({
      createdAt: -1,
    })
    .populate("owner", "name");

  res.json(allReviews);
};

module.exports = getAll;
