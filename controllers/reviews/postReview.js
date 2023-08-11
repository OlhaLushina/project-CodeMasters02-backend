const { HttpError } = require("../../helpers");
const { Review } = require("../../models/review");

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const review = await Review.create({ ...req.body, owner });

  res.status(201).json(review);
};

module.exports = add;
