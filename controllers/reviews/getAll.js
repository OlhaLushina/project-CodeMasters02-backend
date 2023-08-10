const { Review } = require("../../models/review");

//Повертає всі відгуки

const getAll = async (req, res) => {
  const allReviews = await Review.find().sort({ createdat: -1 }).populate("owner", "name");

  res.json(allReviews);
};

module.exports = getAll;
